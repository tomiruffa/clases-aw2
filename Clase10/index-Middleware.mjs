import express from 'express'

const PUERTO = 3000

const app = express()
app.listen(PUERTO)

// Middlewares

const mid1 = (req, res, next)=>{
        console.log('se ejecuto un middleware 1')
        next()
}
const mid2 = (req, res, next)=>{
        console.log('se ejecuto un middleware 2')
        next()
}

// app.use('/', mid1)
app.use('/saludo', mid1)


app.get('/', (req, res)=> {
    console.log('/')    
    res.end()
})        
app.get('/saludo', (req, res)=> {
    console.log('/saludo')    
    res.end()
})