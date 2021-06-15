import { Router } from 'express'
import voluntaryController from './voluntary/voluntary-controller'

const routes = Router()

routes.post('/voluntary', voluntaryController.save)
routes.put('/voluntary', voluntaryController.update)

export { routes }
