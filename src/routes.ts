import { Router } from 'express'
import voluntaryController from './voluntary/voluntary-controller'
import organizationController from './organization/organization-controller'
import inviteController from './invite/invite-controller'
import subscriptionController from './subscription/subcription-controller'
import jobController from './job/job-controller'

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
routes.get('/invite/byOrganization/:id', inviteController.getByOrganization)
routes.get('/invite/byVoluntary/:email', inviteController.getByVoluntary)

routes.post('/subscription', subscriptionController.subscribe)
routes.post('/subscription/accept', subscriptionController.accept)
routes.post('/subscription/cancel', subscriptionController.cancel)
routes.post('/subscription/reject', subscriptionController.reject)
routes.get('/subscription/byOrganization/:id', subscriptionController.getByOrganization)
routes.get('/subscription/byVoluntary/:email', subscriptionController.getByVoluntary)

routes.post('/job', jobController.save)
routes.post('/job/update', jobController.updateHour)
routes.post('/job/close', jobController.close)
routes.get('/job/byOrganization/:id', jobController.getByOrganization)
routes.get('/job/byVoluntary/:email', jobController.getByVoluntary)

export { routes }
