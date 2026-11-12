import { consultarApi, RUTAS } from './api.js'
import { crearElemento, mostrarAviso, formatearPesos } from './dom.js'

const estado = document.getElementById('estado')
const grilla = document.getElementById('grilla')

function crearTarjeta(producto) {
    const tarjeta = crearElemento('article', 'tarjeta producto')
    const enlace = crearElemento('a', '', 'Ver detalle →')
    enlace.href = `item.html?${new URLSearchParams({ id: producto.id })}`

    tarjeta.append(
        crearElemento('span', 'etiqueta', producto.categoria),
        crearElemento('h2', '', producto.nombre),
        crearElemento('div', 'producto__precio', formatearPesos(producto.precio)),
        crearElemento('div', 'producto__stock', `Stock: ${producto.stock} u.`),
        enlace,
    )
    return tarjeta
}

async function cargarProductos() {
    try {
        const productos = await consultarApi(RUTAS.productos)
        if (!productos) return

        grilla.replaceChildren(...productos.map(crearTarjeta))
        estado.textContent = `${productos.length} productos`
        estado.className = 'bajada'
    } catch (error) {
        mostrarAviso(estado, `No se pudieron cargar los productos: ${error.message}`, 'error')
    }
}

cargarProductos()
