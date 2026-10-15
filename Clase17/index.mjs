import express from 'express'
import dotenv from 'dotenv'
import pool from './conexion.bd.mjs'

dotenv.config()


const PUERTO = process.env.PUERTO | 3000

const app = express()

app.get('/api/v1/productos', async (req, res)=>{
    const resultado = await pool.query('SELECT * FROM productos');
    console.log(resultado);
    res.json({})
})

app.listen(PUERTO)