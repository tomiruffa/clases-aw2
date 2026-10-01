async function obtenerDatos() {

    const contenedor = document.getElementById("contenedor");

    try {

        const respuesta = await fetch("../datos/productos.json");

        if (!respuesta.ok) {
            throw new Error("Error al obtener los productos");
        }

        const productos = await respuesta.json();

        // Mensaje de respuesta 
        const mensaje = document.createElement("p");
        mensaje.textContent = "Los productos se cargaron correctamente.";
        contenedor.before(mensaje);

        
        contenedor.innerHTML = "";

        // Recorremos JSON
        productos.forEach(producto => {

            const articulo = document.createElement("article");
            articulo.classList.add("producto");

            articulo.innerHTML = `
                <h3 class="nombre">${producto.nombre}</h3>
                <data class="precio" value="${producto.precio}">
                    Precio: $${producto.precio}
                </data>
                <data class="stock" value="${producto.stock}">
                    Stock: ${producto.stock}
                </data>
            `;

            contenedor.appendChild(articulo);
        });

    } catch (error) {

        // Mensaje de error
        const mensaje = document.createElement("p");
        mensaje.textContent = "Ocurrió un error al cargar los productos.";
        contenedor.before(mensaje);

        console.error("Error:", error);
    }
}

obtenerDatos();