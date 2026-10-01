// crea el servidor y define los endpoints 
import express from 'express'
import config from './modulos/config.mjs'
import { habilitarCors } from './modulos/cors.middleware.mjs'
import { guardarResultado } from './modulos/guardar-resultado.middleware.mjs'
import { rutaNoEncontrada, manejarErrores } from './modulos/errores.middleware.mjs'
import productos from './modulos/productos.controlador.mjs'
import procedimientos from './modulos/procedimientos.controlador.mjs'

const app = express()

app.use(habilitarCors)


// Todos los productos
app.get(config.rutaApi, productos.obtenerProductos)

// Un producto (ruta con parametro)
app.get(`${config.rutaApi}/:id`, productos.obtenerProducto)


// Procedimiento, fuera de la API REST 
app.get(
    config.rutaProcedimiento,
    procedimientos.calcularValorInventario, 
    guardarResultado,                       
    procedimientos.responderResultado,     

)


// Manejo de errores
app.use(rutaNoEncontrada)
app.use(manejarErrores)

app.listen(config.puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${config.puerto}`)
})
