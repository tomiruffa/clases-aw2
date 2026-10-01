// guarda el historial de resultados del procedimiento en un JSON
import config from './config.mjs'
import { leerArchivoJSON, escribirArchivoJSON } from './archivo-json.mjs'

async function guardarResultado(resultado) {
    // Se lee el historial actual, se agrega el nuevo resultado y se vuelve a escribir
    const historial = await leerArchivoJSON(config.archivoResultados)
    historial.push(resultado)
    await escribirArchivoJSON(config.archivoResultados, historial)
}

export default { guardarResultado }
