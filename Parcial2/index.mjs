import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import config from './modulos/config/config.mjs'
import rutasAutenticacion from './modulos/autenticacion/autenticacion.rutas.mjs'
import rutasProductos from './modulos/productos/productos.rutas.mjs'
import rutasProcedimiento from './modulos/procedimiento/procedimiento.rutas.mjs'
import rutasPaginas from './modulos/paginas/paginas.rutas.mjs'
import { rutaNoEncontrada, manejarErrores } from './modulos/errores/errores.middlewares.mjs'

const app = express()

// Cabeceras de seguridad (se saca upgrade-insecure-requests porque se usa http en local)
app.use(helmet({ contentSecurityPolicy: { directives: { upgradeInsecureRequests: null } } }))

// Lee las cookies y verifica las firmadas (quedan en req.signedCookies)
app.use(cookieParser(config.cookie.clave))

app.use(rutasAutenticacion)
app.use(rutasProductos)
app.use(rutasProcedimiento)
app.use(rutasPaginas)

app.use(rutaNoEncontrada)
app.use(manejarErrores)

app.listen(config.puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${config.puerto}`)
})
