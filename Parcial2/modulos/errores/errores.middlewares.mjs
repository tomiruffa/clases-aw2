export function rutaNoEncontrada(req, res) {
    const mensaje = `Ruta no encontrada: ${req.method} ${req.originalUrl}`

    if (req.path.startsWith('/api/') || req.path.startsWith('/procedimientos/')) {
        return res.status(404).json({ mensaje })
    }
    res.status(404).send(mensaje)
}

export function manejarErrores(error, req, res, next) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
}
