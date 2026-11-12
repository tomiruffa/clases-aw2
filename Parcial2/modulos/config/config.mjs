import dotenv from 'dotenv'

dotenv.config()

const minutosSesion = Number(process.env.SESION_MINUTOS) || 60

const config = {
    puerto: process.env.PUERTO || 3000,

    rutas: {
        apiProductos: '/api/v1/productos',
        procedimiento: '/procedimientos/calcular-valor-inventario',
        autenticacion: '/autenticacion',
        cerrarSesion: '/cerrar-sesion',
        login: '/login/',
        app: '/app/',
    },

    bd: {
        host: process.env.BD_HOST,
        port: process.env.BD_PUERTO,
        user: process.env.BD_USUARIO,
        password: process.env.BD_CLAVE,
        database: process.env.BD_NOMBRE,
    },

    jwt: {
        clave: process.env.JWT_CLAVE_SECRETA,
        expiracion: `${minutosSesion}m`,
    },

    // El JWT y la cookie duran lo mismo
    cookie: {
        nombre: 'token',
        clave: process.env.COOKIE_CLAVE_SECRETA,
        duracion: minutosSesion * 60 * 1000,
        opciones: {
            httpOnly: true,
            signed: true,
            sameSite: 'strict',
            secure: process.env.COOKIE_SEGURA === 'true',
            path: '/',
        },
    },
}

export default config
