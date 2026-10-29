import express from 'express';
import pool from './conexion.bd.mjs';
import { nanoid } from 'nanoid';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const PUERTO = process.env.PUERTO || 4000;

////////////////

////////////////
const app = express();
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
////////////////
/// IMPORTANTE -> VER EL ORDEN DE LOS MIDDLEWARES
// Primero, usamos cookieParser para poder leer las cookies
// Luego, usamos express.json() para poder leer el cuerpo de las peticiones POST
// luego, definimos la ruta para el POST de autenticación
// Finalmente, servimos archivos estáticos desde la carpeta 'front'
// y agregamos un middleware para verificar la sesión

app.use(cookieParser());
app.use(express.json());

app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.status(400).send('Usuario y contraseña son requeridos');
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if( resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        }else{
            res.status(500).send('Error al registrar el usuario');
        }
    } catch (error) {
        console.log(error);
       res.status(500).json({mensaje:'Error en el servidor'})
    }
});
// Ruta para el POST login
app.post('/autenticacion', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.status(400).send('Usuario y contraseña son requeridos');
    }
    // Verificamos la contraseña usando bcrypt
    let verificado = false;
    try {
        // Consultamos la contraseña
        const resultado = await pool.query(
            'SELECT password_hash FROM usuarios WHERE username = $1',
            [usuario]
        );
        verificado = await bcrypt.compare(pass, resultado.rows[0].password_hash);
        console.log(resultado)
    } catch (error) {
        return res.status(401).send('Error al verificar la contraseña');
    }
    if (verificado) {
        const sesionId = nanoid(21); // Generar un ID con nanoid
        const resultado = await pool.query(
            'UPDATE usuarios SET session_id = $1 WHERE username = $2 RETURNING session_id',
            [sesionId,usuario]
        );
        console.log(resultado)
        // Establecemos una cookie de sesión
        res.cookie('sessionId', resultado.rows[0].session_id, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });
        res.redirect('/'); // Redirigimos al usuario a la página principal
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});
app.get('/logout', async (req, res) => {
    // Establecemos una cookie de sesión
    res.cookie('sessionId', '', {
        maxAge: 0,
    });
    res.redirect('/'); // Redirigimos al usuario a la página principal
});
// Form login
app.use('/login', express.static('login'));

// Al final, servimos archivos estáticos desde la carpeta 'front'
// Y agregamos un middleware para verificar la sesión
// Ojo que este atrapa todo!!!!
app.use(async (req, res, next) => {
    const userSessionId = req.cookies.sessionId;
        const resultado = await pool.query(
            'SELECT session_id FROM usuarios WHERE session_id = $1',
            [userSessionId]
        );
    if (resultado.rowCount === 0) {
        return res.redirect('/login');
    } else {
        next();
    }
}, express.static('front'));
