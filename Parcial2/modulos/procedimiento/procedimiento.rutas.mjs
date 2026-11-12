import { Router } from 'express'
import config from '../config/config.mjs'
import { autorizarApi } from '../autenticacion/autenticacion.middlewares.mjs'
import { validarDescuento, guardarResultado } from './procedimiento.middlewares.mjs'
import * as controlador from './procedimiento.controlador.mjs'

const rutasProcedimiento = Router()

// autorizar -> validar -> calcular -> guardar -> responder
rutasProcedimiento.get(
    config.rutas.procedimiento,
    autorizarApi,
    validarDescuento,
    controlador.ejecutarProcedimiento,
    guardarResultado,
    controlador.responderResultado,
)

export default rutasProcedimiento
