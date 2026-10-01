// Procedimiento elegido: calcular el valor del inventario (precio * stock de cada producto),
// con un descuento opcional que llega por query string.
// Queda fuera de la API REST porque la ruta es una acción y no un recurso 
import productosModelo from './productos.modelo.mjs'

// calcula y deja el resultado en res.locals
async function calcularValorInventario(req, res, next) {
    
    const url = new URL(req.originalUrl, `http://${req.headers.host}`)
    const parametro = url.searchParams.get('descuento') // null si no viene

    const descuento = parametro === null ? 0 : Number(parametro)

    // Number('') da 0, por eso se controla aparte el caso del texto vacío
    if (parametro === '' || Number.isNaN(descuento) || descuento < 0 || descuento > 100) {
        return res.status(400).json({ mensaje: 'El descuento debe ser un número entre 0 y 100' })
    }

    try {
        const productos = await productosModelo.obtenerProductos()

        let valorTotal = 0
        const detalle = []
        const idsProcesados = []

        productos.forEach((producto) => {
            const valorStock = producto.precio * producto.stock
            valorTotal += valorStock
            idsProcesados.push(producto.id)
            detalle.push({
                id: producto.id,
                nombre: producto.nombre,
                valorStock: valorStock,
            })
        })

        const valorConDescuento = Number((valorTotal * (1 - descuento / 100)).toFixed(2))

        // Se informa qué se procesó y cuál fue el resultado (consigna punto 2)
        res.locals.resultado = {
            procedimiento: 'calcular-valor-inventario',
            fecha: new Date().toISOString(),
            parametros: { descuento },
            procesado: {
                cantidadProductos: productos.length,
                idsProcesados,
            },
            resultado: {
                valorTotal,
                valorConDescuento,
                detalle,
            },
        }

        next() // pasa al siguiente middleware (el que guarda el archivo)
    } catch (error) {
        next(error)
    }
}

// Último paso de la cadena: responde al cliente
function responderResultado(req, res) {
    res.status(200).json(res.locals.resultado)
}

export default { calcularValorInventario, responderResultado }
