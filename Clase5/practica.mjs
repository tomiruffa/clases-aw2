const numeros = [1,2,3,4,5,6]
// map
// function recorrer(){

// }
// const recorrer = ()=> {
//     //
// }
// numeros.map(recorrer)

// const nuevoArreglo = numeros.map((numero)=>{
//     console.log(numero)
//     return numero + 2
// })
// console.log(nuevoArreglo)

// trabajar con un objeto

const productos = [
    {
        nombre: 'pantalon',
        precio: 100
    },
    {
        nombre: 'remera',
        precio: 50
    }
]

//
const productosConInteres = productos.map((producto)=>{
    const productoCambiado = {
        nombre: producto.nombre,
        precio: producto.precio * 1.1
    }
    return productoCambiado
})

console.log(productosConInteres)