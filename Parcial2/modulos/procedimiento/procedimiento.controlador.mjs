import * as modeloProductos from '../productos/productos.modelo.mjs'
import * as vistaProductos from '../productos/productos.vista.mjs'
import { calcularValorInventario } from './procedimiento.servicio.mjs'

export async function ejecutarProcedimiento(req, res, next) {
    try {
        const filas = await modeloProductos.obtenerProductos()
        const productos = vistaProductos.formatearProductos(filas)

        res.locals.resultado = calcularValorInventario(productos, res.locals.descuento)
        next()
    } catch (error) {
        next(error)
    }
}

export function responderResultado(req, res) {
    res.status(200).json(res.locals.resultado)
}
