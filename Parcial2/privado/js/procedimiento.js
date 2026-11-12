import { consultarApi, RUTAS } from './api.js'
import { crearElemento, mostrarAviso, formatearPesos } from './dom.js'

const formulario = document.getElementById('formulario')
const boton = document.getElementById('boton-ejecutar')
const estado = document.getElementById('estado')
const resultado = document.getElementById('resultado')

function armarUrl() {
    const url = new URL(RUTAS.procedimiento, window.location.origin)
    const descuento = document.getElementById('descuento').value.trim()
    if (descuento !== '') url.searchParams.set('descuento', descuento)
    return url
}

function crearFila(item) {
    const fila = crearElemento('tr')
    fila.append(
        crearElemento('td', '', item.id),
        crearElemento('td', '', item.nombre),
        crearElemento('td', 'numero', formatearPesos(item.precio)),
        crearElemento('td', 'numero', item.stock),
        crearElemento('td', 'numero', formatearPesos(item.valorStock)),
    )
    return fila
}

function mostrarResultado(datos) {
    document.getElementById('cantidad').textContent = datos.procesado.cantidadProductos
    document.getElementById('valor-total').textContent = formatearPesos(datos.resultado.valorTotal)
    document.getElementById('valor-descuento').textContent =
        `${formatearPesos(datos.resultado.valorConDescuento)} (−${datos.parametros.descuento} %)`
    document.getElementById('registro').textContent = `#${datos.registro.id}`
    document.getElementById('detalle').replaceChildren(...datos.resultado.detalle.map(crearFila))

    resultado.classList.remove('oculto')
    const fecha = new Date(datos.fecha).toLocaleString('es-AR')
    mostrarAviso(estado, `Procedimiento ejecutado con éxito (${fecha}). El resultado se guardó en la base de datos.`, 'exito')
}

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    boton.disabled = true

    try {
        const datos = await consultarApi(armarUrl())
        if (datos) mostrarResultado(datos)
    } catch (error) {
        resultado.classList.add('oculto')
        mostrarAviso(estado, `No se pudo ejecutar el procedimiento: ${error.message}`, 'error')
    } finally {
        boton.disabled = false
    }
})
