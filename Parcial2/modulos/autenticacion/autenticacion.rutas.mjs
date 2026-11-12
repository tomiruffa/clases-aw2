import express, { Router } from 'express'
import config from '../config/config.mjs'
import * as controlador from './autenticacion.controlador.mjs'

const rutasAutenticacion = Router()

// El form del login llega como urlencoded
rutasAutenticacion.post(config.rutas.autenticacion, express.urlencoded({ extended: false }), controlador.iniciarSesion)
rutasAutenticacion.get(config.rutas.cerrarSesion, controlador.cerrarSesion)

export default rutasAutenticacion
