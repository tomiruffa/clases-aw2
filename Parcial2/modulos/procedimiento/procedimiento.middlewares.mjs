import * as modelo from './procedimiento.modelo.mjs'

// ?descuento= es opcional, si viene tiene que ser un número entre 0 y 100
export function validarDescuento(req, res, next) {
    const parametro = req.query.descuento

    if (parametro === undefined) {
        res.locals.descuento = 0
        return next()
    }

    const descuento = Number(parametro)
    if (typeof parametro !== 'string' || parametro.trim() === '' ||
        Number.isNaN(descuento) || descuento < 0 || descuento > 100) {
        return res.status(400).json({ mensaje: 'El descuento debe ser un número entre 0 y 100' })
    }

    res.locals.descuento = descuento
    next()
}

// Middleware propio: guarda el resultado del procedimiento en la BD
export async function guardarResultado(req, res, next) {
    try {
        const id = await modelo.guardarResultado(res.locals.resultado)
        res.locals.resultado.registro = { id }
        next()
    } catch (error) {
        next(error)
    }
}
