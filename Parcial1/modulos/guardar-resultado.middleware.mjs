// Middleware guarda en un JSON del servidor el resultado del procedimiento.

import resultadosModelo from './resultados.modelo.mjs'

export async function guardarResultado(req, res, next) {
    try {
        
        await resultadosModelo.guardarResultado(res.locals.resultado)
        next()
    } catch (error) {
        next(error)
    }
}
