import http from 'node:http'


console.log('Inicio')
// instanciamos un servidor
const servidor = http.createServer((peticion, respuesta)=>{
    //console.log(peticion)
    //console.log('entra peticion')
    //console.log(peticion.url, peticion.method)
    //respuesta.end('Moriste en madrid')
})

if(peticion.url === '/'){
    respuesta.end('en raiz')
}else if(peticion.url === '/saludo'){
    respuesta.end('hola river')
}else{
    respuesta.statusCode = 404
    respuesta.end('no encontrado')
}


// abrimos puerto y lo podemos escuchar
servidor.listen(3000, ()=>{
    console.log('servidor arrancado')
})