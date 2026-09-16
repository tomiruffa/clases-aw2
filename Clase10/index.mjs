import express from 'express'

const PUERTO = 3000

const app = express()
app.listen(PUERTO)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use('/', mid1)
//el mid express static sirve una web estatica (recursos)
app.use(express.static('./web'))

app.get('/', (req, res)=> {
    console.log('/')    
    res.end()
})        
app.get('/saludo', (req, res)=> {
    console.log('/saludo')    
    res.end()
})

//recibir datos del navegador/cliente
app.post('/datos',(res, req)=>{
    const {nombre, apellido} = req.body
    console.log(req.body)
    res.end()
})


