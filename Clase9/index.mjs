import express from 'express'

const PUERTO = 3000

const app = express()
app.listen(PUERTO,()=>{
    console.log(`Servidor corriendo http://localhost:${PUERTO}`)
})

app.post('/', (req, res)=>{
    const usuarios = [
        {
            nombre: "Andres",
            email: "asenn@ies21.edu.ar"
        },
        {
            nombre: "Tomas",
            email: "tomiruffa10@gmail.com"
        }
    ]
    res.json(usuarios)
})

app.get('/saludo', (req, res)=>{
    res.json({mensaje:'hola'})
})


app.get('/:id', (req, res)=>{
    const id = Number(req.params.id)
    
    const usuarios = [
        {
            id: 1,
            nombre: "Andres",
            email: "asenn@ies21.edu.ar"
        },
        {
            id: 2,
            nombre: "Tomas",
            email: "tomiruffa10@gmail.com"
        }
    ]

    const usuariosFiltrados = usuarios.filter((usuario)=>{
        return usuario.id === id
    })
    if (usuariosFiltrados.length > 0){
        res.json(usuariosFiltrados)
    }else{
        res.status(404).json({mensaje: 'usuario no encontrado'})
    }
    res.json({mensaje: 'consulta por ID' + id})
})





