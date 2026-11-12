import { Pool } from 'pg'
import config from './config.mjs'

const pool = new Pool(config.bd)

// Evita que se caiga el servidor si se corta una conexión del pool
pool.on('error', (error) => {
    console.error('Error en la conexión con la BD:', error.message)
})

export default pool
