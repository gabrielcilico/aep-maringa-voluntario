import { Router } from 'express'
import voluntaryController from './voluntary/voluntary-controller'
import organizationController from './organization/organization-controller'

const routes = Router()

routes.post('/voluntary', voluntaryController.save)
routes.put('/voluntary', voluntaryController.update)
routes.get('/voluntary', voluntaryController.getAll)
routes.get('/voluntary/:email', voluntaryController.getByEmail)

routes.post('/organization', organizationController.save)
routes.put('/organization', organizationController.update)
routes.get('/organization', organizationController.getAll)
routes.get('/organization/:id', organizationController.getById)
routes.get('/organization/category/:category', organizationController.getByCategory)

export { routes }
