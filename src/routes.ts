import { Router } from 'express'

const routes = Router()

routes.post('/users', (req, res) => {
  return res.status(201).send()
})

export { routes }
