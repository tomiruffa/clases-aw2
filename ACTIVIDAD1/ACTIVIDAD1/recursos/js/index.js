async function obtenerDatos() {

    try {

        const respuesta = await fetch('./recursos/datos/productos.json')

        if (!respuesta.ok) {
            throw new Error('Error al cargar los productos')
        }

        const productos = await respuesta.json()
        const contenedor = document.getElementById('contenedor')

        contenedor.innerHTML = ''

        productos.forEach(producto => {

            const articulo = document.createElement('article')

            articulo.classList.add('producto')

            articulo.innerHTML = `
                <h3 class="nombre">${producto.nombre}</h3>
                <data class="precio">Precio: $${producto.precio}</data>
                <data class="stock">Stock: ${producto.stock}</data>
            `

            contenedor.appendChild(articulo)

        })

        document.getElementById('mensaje').textContent =
            'Productos cargados correctamente'

    } catch (error) {

        document.getElementById('mensaje').textContent =
            'Error al cargar los productos'

    }
}

obtenerDatos()