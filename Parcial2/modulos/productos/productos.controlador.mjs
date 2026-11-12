import * as modelo from './productos.modelo.mjs'
import * as vista from './productos.vista.mjs'

// GET /api/v1/productos
export async function obtenerProductos(req, res, next) {
    try {
        const filas = await modelo.obtenerProductos()
        res.status(200).json(vista.formatearProductos(filas))
    } catch (error) {
        next(error)
    }
}

// GET /api/v1/productos/:id
export async function obtenerProducto(req, res, next) {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensaje: 'El id debe ser un número entero positivo' })
    }

    try {
        const fila = await modelo.obtenerProducto(id)
        if (!fila) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }
        res.status(200).json(vista.formatearProducto(fila))
    } catch (error) {
        next(error)
    }
}
