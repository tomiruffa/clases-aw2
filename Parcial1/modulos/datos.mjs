// Acceso a los datos: lee y escribe los archivos JSON (clase 4)
import fsp from 'node:fs/promises'
import path from 'node:path'
import config from './config.mjs'

// leer y escribir archivos JSON
// Se lee el archivo en cada llamada para tener siempre los datos actualizados
async function leerArchivoJSON(ruta) {
    const contenido = await fsp.readFile(path.join(ruta), 'utf-8')
    return JSON.parse(contenido) // pasa de texto JSON a objeto de JavaScript (parse)
}

async function escribirArchivoJSON(ruta, datos) {
    // JSON.stringify con 2 espacios para que el archivo se lea bien
    await fsp.writeFile(path.join(ruta), JSON.stringify(datos, null, 2), 'utf-8')
}

// Productos: este modulo es el unico que sabe de donde salen los datos
export async function obtenerProductos() {
    return await leerArchivoJSON(config.archivoProductos)
}

export async function obtenerProducto(id) {
    const productos = await obtenerProductos()
    // find() devuelve el primer elemento que cumple la condición, o undefined
    const producto = productos.find((producto) => {
        return producto.id === id
    })
    return producto
}

// Resultados: guarda el historial de resultados del procedimiento en un JSON
export async function guardarResultado(resultado) {
    // Se lee el historial actual, se agrega el nuevo resultado y se vuelve a escribir
    const historial = await leerArchivoJSON(config.archivoResultados)
    historial.push(resultado)
    await escribirArchivoJSON(config.archivoResultados, historial)
}
