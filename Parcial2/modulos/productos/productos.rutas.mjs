import { Router } from 'express'
import config from '../config/config.mjs'
import { autorizarApi } from '../autenticacion/autenticacion.middlewares.mjs'
import * as controlador from './productos.controlador.mjs'

const rutasProductos = Router()

rutasProductos.get(config.rutas.apiProductos, autorizarApi, controlador.obtenerProductos)
rutasProductos.get(`${config.rutas.apiProductos}/:id`, autorizarApi, controlador.obtenerProducto)

export default rutasProductos
