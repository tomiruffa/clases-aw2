import bcrypt from 'bcryptjs'

// Compara la clave ingresada con el hash guardado en la BD
export async function compararClave(clave, hash) {
    return await bcrypt.compare(clave, hash)
}
