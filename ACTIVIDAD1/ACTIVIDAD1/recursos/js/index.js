async function obtenerDatos(){
    // Response
    const respuesta = await fetch('./datos/productos.json')
    const productos = await respuesta.json()
    productos.forEach(()=>{
        
    })  

}