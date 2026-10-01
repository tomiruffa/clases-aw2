// CORS para el verbo GET

export function habilitarCors(req, res, next) {
    if (req.method === 'GET') {
        res.setHeader('Access-Control-Allow-Origin', '*')
    }
    next()
}
