import { DBInit } from './src/database/datasouce'
import express, { Express } from 'express'

import { Router } from './src/routes/route'
import dotenv from 'dotenv'

// load up config
dotenv.config()

// create express app
const app: Express = express()
// port from .env
const port = process.env.PORT

// initialization db connection
DBInit()
// registering route
Router(app)

// middleware json validator
app.use(express.json)
app.use(express.urlencoded({ extended: true }))

// open port
app.listen(port, () => {
  console.log(`[server]: Servier is runnting at http://localhost:${port}`)
})
