import pool from '../config/conexion.bd.mjs'

export async function obtenerUsuario(username) {
    const resultado = await pool.query(
        'SELECT id, username, password_hash FROM usuarios WHERE username = $1',
        [username]
    )
    return resultado.rows[0]
}
