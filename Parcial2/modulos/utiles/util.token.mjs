import jwt from 'jsonwebtoken'
import config from '../config/config.mjs'

export function crearToken(datos) {
    return jwt.sign(datos, config.jwt.clave, { expiresIn: config.jwt.expiracion })
}

// Si el token es inválido o venció, jwt.verify lanza un error
export function verificarToken(token) {
    return jwt.verify(token, config.jwt.clave, { algorithms: ['HS256'] })
}
