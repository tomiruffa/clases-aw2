import express from 'express'
import rutasV1 from './rutas.mjs'

const Puerto = 3000

const app = express()
app.listen(Puerto)

app.use(rutasV1)