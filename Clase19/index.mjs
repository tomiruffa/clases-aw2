import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'

const tablaUsuarios ={
    nombre:'admin',
    pass:'123456'
}

const PUERTO = 3000

const app = express()

app.listen(PUERTO)
//
app.use(cookieParser('palabra-clave'));
//
app.use(express.urlencoded({extended:true}))

app.post('/autentication',(req, res)=>{
    console.log(req.body)
    const {usuario, pass} = req.body
    //chequeamos datos
    if(usuario === tablaUsuarios.nombre && pass === tablaUsuarios.pass){
        //cookie
        res.cookie('sesionId',123456,{
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            signed: true,
            maxAge: 1000 * 60 * 60 * 24
        })
        return res.redirect('/admin')
    }
    res.redirect('/login')
})

//Estáticos
function verificarCookie(req, res, next){
    console.log(req.signedCookies)
    if(req.cookies.sesionId === '123456'){
        return next()
    }
    res.redirect('/login/?autorizado=false')
}

app.use('/admin',verificarCookie, express.static(path.resolve('/.front')))
app.use('/login', express.static(path.resolve('.login')))