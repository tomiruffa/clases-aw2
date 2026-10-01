// Middlewares de la aplicación (clase 10)
import * as datos from './datos.mjs'

// CORS para el verbo GET
export function habilitarCors(req, res, next) {
    if (req.method === 'GET') {
        res.setHeader('Access-Control-Allow-Origin', '*')
    }
    next()
}

// Middleware propio: guarda en un JSON del servidor el resultado del procedimiento.
export async function guardarResultado(req, res, next) {
    try {

        await datos.guardarResultado(res.locals.resultado)
        next()
    } catch (error) {
        next(error)
    }
}

// Tratamiento de errores

// Si ninguna ruta respondió antes, la ruta no existe (404)
export function rutaNoEncontrada(req, res) {
    res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` })
}

export function manejarErrores(error, req, res, next) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
}
