// pg devuelve los NUMERIC como texto, se pasa el precio a número
export function formatearProducto(fila) {
    return {
        id: fila.id,
        nombre: fila.nombre,
        categoria: fila.categoria,
        precio: Number(fila.precio),
        stock: fila.stock,
    }
}

export function formatearProductos(filas) {
    return filas.map(formatearProducto)
}
