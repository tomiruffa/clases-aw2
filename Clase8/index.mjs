import express from 'express'

const PUERTO = 3000

const app = express()

//--- config las rutas
app.get('/', (req, res)=>{
    //res.end('HOLA EXPRESS')
    //send.end('Hola')
    //res.send({"mensaje": "Hola"})
    res.send('<h1>Hola con send</h1>')

})












app.listen(PUERTO, ()=>{
    console.log(`Servidor express corriendo en el puerto ${PUERTO}`)
})
