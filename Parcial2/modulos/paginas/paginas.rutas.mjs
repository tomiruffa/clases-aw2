import express, { Router } from 'express'
import path from 'node:path'
import config from '../config/config.mjs'
import { autorizarPagina, redirigirSiHaySesion } from '../autenticacion/autenticacion.middlewares.mjs'

const rutasPaginas = Router()

// Público: CSS y login
rutasPaginas.use('/recursos', express.static(path.resolve('publico/recursos')))
rutasPaginas.use('/login', redirigirSiHaySesion, express.static(path.resolve('publico/login')))

// Privado: primero se verifica el token y después se sirven los archivos
rutasPaginas.use('/app', autorizarPagina, express.static(path.resolve('privado'), { index: 'items.html' }))

rutasPaginas.get('/', (req, res) => res.redirect(config.rutas.app))

export default rutasPaginas
