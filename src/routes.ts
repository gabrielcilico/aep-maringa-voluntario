import { Router } from 'express'
import voluntaryController from './voluntary/voluntary-controller'
import organizationController from './organization/organization-controller'
import inviteController from './invite/invite-controller'
import subscriptionController from './subscription/subcription-controller'

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

routes.post('/invite', inviteController.invite)
routes.post('/invite/accept', inviteController.accept)
routes.post('/invite/cancel', inviteController.cancel)
routes.post('/invite/reject', inviteController.reject)

routes.post('/invite', subscriptionController.invite)
routes.post('/invite/accept', subscriptionController.accept)
routes.post('/invite/cancel', subscriptionController.cancel)
routes.post('/invite/reject', subscriptionController.reject)


export { routes }
