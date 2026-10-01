// crea el servidor y define los endpoints
import express from 'express'
import config from './modulos/config.mjs'
import { habilitarCors, guardarResultado, rutaNoEncontrada, manejarErrores } from './modulos/middlewares.mjs'
import * as productos from './modulos/productos.mjs'
import * as inventario from './modulos/inventario.mjs'

const app = express()

app.use(habilitarCors)


// Todos los productos
app.get(config.rutaApi, productos.obtenerProductos)

// Un producto (ruta con parametro)
app.get(`${config.rutaApi}/:id`, productos.obtenerProducto)


// Procedimiento, fuera de la API REST
app.get(
    config.rutaProcedimiento,
    inventario.calcularValorInventario,
    guardarResultado,
    inventario.responderResultado,
)



// Manejo de errores
app.use(rutaNoEncontrada)
app.use(manejarErrores)

app.listen(config.puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${config.puerto}`)
})
