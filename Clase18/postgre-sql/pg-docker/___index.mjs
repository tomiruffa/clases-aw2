// Conectar a local docente
// Doc pg -> https://node-postgres.com/

import express from 'express';
import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'tienda',
    port: 5432,
})


const app = express(); 
app.listen(3000, () => {
    console.log('Server on port 3000');
});

app.get('/productos', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM productos');
    res.json(resultado.rows);
});