import { consultarApi, RUTAS } from './api.js'
import { crearElemento, mostrarAviso, formatearPesos } from './dom.js'

const estado = document.getElementById('estado')
const ficha = document.getElementById('ficha')

// El id viene en el query string: item.html?id=3
const id = new URLSearchParams(window.location.search).get('id')

function mostrarFicha(producto) {
    const lista = crearElemento('dl')
    const datos = [
        ['Id', producto.id],
        ['Categoría', producto.categoria],
        ['Precio', formatearPesos(producto.precio)],
        ['Stock', `${producto.stock} unidades`],
    ]
    datos.forEach(([titulo, valor]) => {
        lista.append(crearElemento('dt', '', titulo), crearElemento('dd', '', valor))
    })

    const volver = crearElemento('a', '', '← Volver a Ítems')
    volver.href = 'items.html'

    ficha.replaceChildren(crearElemento('h2', '', producto.nombre), lista, volver)
    ficha.classList.remove('oculto')
}

async function cargarProducto() {
    if (id === null) return

    document.getElementById('id').value = id
    estado.textContent = 'Cargando…'
    estado.className = 'cargando'

    try {
        const producto = await consultarApi(`${RUTAS.productos}/${encodeURIComponent(id)}`)
        if (!producto) return
        estado.className = 'oculto'
        mostrarFicha(producto)
    } catch (error) {
        mostrarAviso(estado, error.message, 'error')
    }
}

cargarProducto()
