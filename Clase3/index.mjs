/* uso de modulos built-in 
con el sistema de modulo moderno */

import os from 'node:os'
/* import { readFile } from 'node:fs/promises' */
import fsp from 'node:fs/promises'

const contenido = await fsp.readFile('./texto.txt','utf8')
console.log(contenido)


/* console.log(os.freemem() - os.totalmem()) */
