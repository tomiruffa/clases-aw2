import pool from '../config/conexion.bd.mjs'

export async function obtenerProductos() {
    const resultado = await pool.query('SELECT * FROM productos ORDER BY id')
    return resultado.rows
}

// undefined si no existe
export async function obtenerProducto(id) {
    const resultado = await pool.query('SELECT * FROM productos WHERE id = $1', [id])
    return resultado.rows[0]
}
