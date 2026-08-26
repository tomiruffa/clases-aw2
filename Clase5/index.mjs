// Declarar funcion obtenerUsuarios

/*
cuerpo de la funcion:
- Obtener via fetch() los usuarios desde la API REST
- const usuarios <--- arreglo de usuarios
*/
async function obtenerUsuarios(){
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
    const usuarios = await respuesta.json() //<--- arreglo de objetos
    }