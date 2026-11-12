import config from '../config/config.mjs'
import { verificarToken } from '../utiles/util.token.mjs'

/*
Lee el token de la cookie firmada y lo verifica.
Devuelve los datos del usuario o el motivo por el que no está autorizado.
*/
function obtenerSesion(req) {
    const token = req.signedCookies[config.cookie.nombre]

    // false = la cookie fue modificada (no coincide la firma)
    if (token === false) return { motivo: 'invalida' }
    if (!token) return { motivo: 'requerida' }

    try {
        return { usuario: verificarToken(token) }
    } catch (error) {
        return { motivo: error.name === 'TokenExpiredError' ? 'expirada' : 'invalida' }
    }
}

export function borrarCookie(res) {
    res.clearCookie(config.cookie.nombre, config.cookie.opciones)
}

// Para la API: si no hay sesión responde 401
export function autorizarApi(req, res, next) {
    const { usuario, motivo } = obtenerSesion(req)

    if (!usuario) {
        if (motivo !== 'requerida') borrarCookie(res)
        return res.status(401).json({ mensaje: `No autorizado (sesión ${motivo})` })
    }

    req.usuario = usuario
    next()
}

// Para las páginas: si no hay sesión redirige al login
export function autorizarPagina(req, res, next) {
    const { usuario, motivo } = obtenerSesion(req)

    if (!usuario) {
        if (motivo !== 'requerida') borrarCookie(res)
        return res.redirect(`${config.rutas.login}?sesion=${motivo}`)
    }

    req.usuario = usuario
    next()
}

// Si ya está logueado no tiene sentido mostrarle el login
export function redirigirSiHaySesion(req, res, next) {
    const { usuario } = obtenerSesion(req)
    if (usuario) return res.redirect(config.rutas.app)
    next()
}
