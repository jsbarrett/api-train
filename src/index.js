// BOOTSTRAP
require('dotenv').config()
const path = require('path')
global.lib = path.resolve(__dirname, '../lib')
global.database = path.resolve(__dirname, `../database/${process.env.DATABASE}`)

// SETUP
const express = require('express')
const app = express()
const routes = require('./routes')
const { PORT } = process.env

app.use(express.json())
app.use(routes)
app.listen(PORT, () => { console.log(`App listening on port ${PORT}`) })
