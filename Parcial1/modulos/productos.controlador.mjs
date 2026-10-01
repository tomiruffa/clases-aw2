// conecta el modelo con la respuesta al cliente 
import modelo from './productos.modelo.mjs'

// GET /api/v1/productos
async function obtenerProductos(req, res) {
    try {
        const productos = await modelo.obtenerProductos()
        res.status(200).json(productos)
    } catch (error) {
        console.error(error)
        
        res.status(500).json({ mensaje: 'Error al obtener los productos' })
    }
}

// GET /api/v1/productos/:id
async function obtenerProducto(req, res) {
    
    const id = Number(req.params.id)

    // Si el id no es un entero positivo, la petición está mal hecha (400)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensaje: 'El id debe ser un número entero positivo' })
    }

    try {
        const producto = await modelo.obtenerProducto(id)
        if (producto) {
            res.status(200).json(producto)
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al obtener el producto' })
    }
}

export default { obtenerProductos, obtenerProducto }
