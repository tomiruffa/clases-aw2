import {Pool} from 'pg';

const pool = new Pool({
    host:'localhost',
    port:5432,
    user: 'root',
    password: 'pass',
    database: 'tienda',
})
export default pool;



