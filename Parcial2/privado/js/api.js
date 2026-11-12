export const RUTAS = {
    productos: '/api/v1/productos',
    procedimiento: '/procedimientos/calcular-valor-inventario',
}

// Hace el fetch (la cookie se manda sola porque es el mismo dominio)
export async function consultarApi(url) {
    const respuesta = await fetch(url)

    if (respuesta.status === 401) {
        window.location.href = '/login/?sesion=expirada'
        return null
    }

    const datos = await respuesta.json()
    if (!respuesta.ok) {
        throw new Error(datos.mensaje)
    }
    return datos
}
