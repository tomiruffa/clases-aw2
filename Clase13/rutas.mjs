// import express from 'express'
import {Router} from 'express'

const rutasApiV1 = new Router()

rutasApiV1.get('/api/v1/camisetas', (req, res) =>{
    res.status(200).json([
        {
            "id": 1,
            "nombre": "River",
            "precio": 120000
        }
    ]);
})

rutasApiV1.get('/api/v1/camisetas/:id', (req, res) =>{
    const id = req.params.id
    res.status(200).json([
        {
            "id": 1,
            "nombre": "River",
            "precio": 120000
        }
    ]);
})

export default rutasApiV1 
