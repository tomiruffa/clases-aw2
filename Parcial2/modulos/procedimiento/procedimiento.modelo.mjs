import pool from '../config/conexion.bd.mjs'

// Guarda una ejecución y devuelve el id generado
export async function guardarResultado(datos) {
    const { procedimiento, fecha, parametros, procesado, resultado } = datos
    const respuesta = await pool.query(
        `INSERT INTO resultados_procedimiento (procedimiento, fecha, parametros, procesado, resultado)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [procedimiento, fecha, JSON.stringify(parametros), JSON.stringify(procesado), JSON.stringify(resultado)]
    )
    return respuesta.rows[0].id
}
