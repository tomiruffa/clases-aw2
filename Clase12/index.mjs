import express from 'express'

const Puerto = 3000

const logs = [{compu: 185, estado: "activo"}]

const app = express()

app.use(express.json());

const verifyKey = (req, res, next)=>{
    const key = req.body["key"];
    if (key === "RacingCampeonCopaArgentina2026"){
        next();
    } else {
        res.status(403).json({ error: "Key invalida"});
    }
};

app.get("/estado", (req, res) =>{
    res.json(data);
})

//crear arreglo donde guardaremos como un log de estados

app.post('/estado',verifyKey, (req, res) => {
    const { key, ...newData } = req.body;
    data.push(newData)

    res.json(data);
})

app.listen(Puerto, () => {
    console.log(`Servidor corriendo http://localhost:${Puerto}`)
})