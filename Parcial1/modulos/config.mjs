// Configuración en un solo lugar, como api.config.mjs del TID (SP2 ejercicio resuelto, p. 204-205)
const config = {
    puerto: 3000,
    // Ruta base versionada y con sustantivo en plural 
    rutaApi: '/api/v1/productos',
    
    
    rutaProcedimiento: '/procedimientos/calcular-valor-inventario',
    archivoProductos: './datos/productos.json',
    archivoResultados: './datos/resultados-procedimiento.json',
}

export default config
