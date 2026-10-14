import productos from "../../datos/productos.mjs";

// GET todos
export function obtenerProductos() {
    return productos
}

export function obtenerProducto(id) {
    // Filtramos
    const producto = productos.filter(producto => producto.id === id)
    return producto
}