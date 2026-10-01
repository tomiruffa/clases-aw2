// Modelo: es el único módulo que sabe de dónde salen los datos 

import config from './config.mjs'
import { leerArchivoJSON } from './archivo-json.mjs'

async function obtenerProductos() {
    return await leerArchivoJSON(config.archivoProductos)
}

async function obtenerProducto(id) {
    const productos = await obtenerProductos()
    // find() devuelve el primer elemento que cumple la condición, o undefined 
    
    const producto = productos.find((producto) => {
        return producto.id === id
    })
    return producto
}

export default { obtenerProductos, obtenerProducto }
