import express from 'express';
import path from 'node:path';
import pool from './db_connection.mjs';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post('/autenticacion', async (req, res) => {
  try {
    const { usuario, pass } = req.body;
    const { rows } = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1',
      [usuario]
    );

    if (!rows[0] || !(await bcrypt.compare(pass, rows[0].password_hash))) {
      return res.redirect('/login');
    }

    const sessionId = nanoid();
    await pool.query('UPDATE usuarios SET session_id = $1 WHERE id = $2', [
      sessionId,
      rows[0].id,
    ]);

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hora
    });
    res.redirect('/admin');
  } catch (e) {
    console.error(e);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/registrar', async (req, res) => {
  try {
    const { usuario, pass } = req.body;
    const hash = await bcrypt.hash(pass, 10);
    await pool.query(
      'INSERT INTO usuarios(username, password_hash) VALUES ($1, $2)',
      [usuario, hash]
    );
    res.redirect('/login');
  } catch (e) {
    console.error(e);
    res.status(e.code === '23505' ? 409 : 500).send('No se pudo registrar');
  }
});

async function verificarCookie(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT id FROM usuarios WHERE session_id = $1',
      [req.cookies.sessionId]
    );
    if (!rows.length) return res.redirect('/login?autorizado=false');
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send('Error interno del servidor');
  }
}

app.use('/admin', verificarCookie, express.static(path.resolve('./front')));
app.use('/login', express.static(path.resolve('./login')));

app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
