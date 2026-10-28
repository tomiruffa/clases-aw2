import express from 'express'
import pool from './db.mjs'

const res = await pool.query('SELECT * FROM productos')

console.log(res.rows)