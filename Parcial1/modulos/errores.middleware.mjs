// Tratamiento de errores


// Si ninguna ruta respondió antes, la ruta no existe (404)
export function rutaNoEncontrada(req, res) {
    res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` })
}


export function manejarErrores(error, req, res, next) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
}
