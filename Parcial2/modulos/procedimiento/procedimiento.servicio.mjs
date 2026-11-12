/*
Calcula el valor del inventario (precio * stock de cada producto)
y le aplica el descuento.

total = 0
por cada producto:
    valorStock = precio * stock
    total += valorStock
conDescuento = total - total * descuento / 100
*/
export function calcularValorInventario(productos, descuento) {
    let valorTotal = 0
    const detalle = []

    productos.forEach((producto) => {
        const valorStock = producto.precio * producto.stock
        valorTotal += valorStock
        detalle.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            valorStock,
        })
    })

    const valorConDescuento = Number((valorTotal * (1 - descuento / 100)).toFixed(2))

    return {
        procedimiento: 'calcular-valor-inventario',
        fecha: new Date().toISOString(),
        parametros: { descuento },
        procesado: {
            cantidadProductos: productos.length,
            idsProcesados: productos.map((producto) => producto.id),
        },
        resultado: {
            valorTotal,
            valorConDescuento,
            detalle,
        },
    }
}
