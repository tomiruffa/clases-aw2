import { obtenerDatos } from './modulos/usuarios.mjs';
import { escribirJson, leerJson } from './modulos/archivos.mjs';

const usuariosFormateados = await obtenerDatos();
await escribirJson(usuariosFormateados);
const usuariosLeidos = await leerJson();
console.log(usuariosLeidos);
