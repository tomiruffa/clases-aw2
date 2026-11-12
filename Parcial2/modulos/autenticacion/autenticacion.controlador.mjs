import config from '../config/config.mjs'
import { obtenerUsuario } from './usuarios.modelo.mjs'
import { compararClave } from '../utiles/util.hashing.mjs'
import { crearToken } from '../utiles/util.token.mjs'
import { borrarCookie } from './autenticacion.middlewares.mjs'

/*
POST /autenticacion
- busca el usuario en la BD
- compara la clave con bcrypt
- si está bien crea el JWT y lo manda en una cookie
*/
export async function iniciarSesion(req, res) {
    const { usuario, clave } = req.body ?? {}

    if (!usuario || !clave) {
        return res.redirect(303, `${config.rutas.login}?error=incompletos`)
    }

    try {
        const registro = await obtenerUsuario(usuario)
        const claveCorrecta = registro ? await compararClave(clave, registro.password_hash) : false

        // Mismo mensaje si no existe el usuario o si la clave está mal
        if (!claveCorrecta) {
            return res.redirect(303, `${config.rutas.login}?error=credenciales`)
        }

        const token = crearToken({ id: registro.id, usuario: registro.username })

        res.cookie(config.cookie.nombre, token, {
            ...config.cookie.opciones,
            maxAge: config.cookie.duracion,
        })
        res.redirect(303, config.rutas.app)
    } catch (error) {
        console.error(error)
        res.redirect(303, `${config.rutas.login}?error=servidor`)
    }
}

// GET /cerrar-sesion
export function cerrarSesion(req, res) {
    borrarCookie(res)
    res.redirect(`${config.rutas.login}?sesion=cerrada`)
}
