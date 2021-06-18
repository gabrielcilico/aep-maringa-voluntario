import 'reflect-metadata'
import express from 'express'
import { routes } from './routes'
import cors from 'cors'
import "./database/connect"
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { app }
