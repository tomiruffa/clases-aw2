// Se usa textContent en vez de innerHTML para no ejecutar HTML que venga en los datos
export function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta)
    if (clase) elemento.className = clase
    if (texto !== undefined) elemento.textContent = texto
    return elemento
}

export function mostrarAviso(elemento, texto, tipo) {
    elemento.textContent = texto
    elemento.className = `aviso aviso--${tipo}`
}

export function formatearPesos(valor) {
    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
}
