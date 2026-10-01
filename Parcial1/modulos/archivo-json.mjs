// leer y escribir archivos JSON 

import fsp from 'node:fs/promises'
import path from 'node:path'

// Se lee el archivo en cada llamada para tener siempre los datos actualizados
export async function leerArchivoJSON(ruta) {
    const contenido = await fsp.readFile(path.join(ruta), 'utf-8')
    return JSON.parse(contenido) // pasa de texto JSON a objeto de JavaScript (parse)
}

export async function escribirArchivoJSON(ruta, datos) {
    // JSON.stringify con 2 espacios para que el archivo se lea bien
    await fsp.writeFile(path.join(ruta), JSON.stringify(datos, null, 2), 'utf-8')
}
