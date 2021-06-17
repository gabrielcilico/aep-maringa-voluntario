import { Subscription } from "./subscription-model";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Organization } from "../organization/organization-model";
import { Voluntary } from "../voluntary/voluntary-model";
import { Job } from '../job/job-model';

class SubscriptionController {

  async subscribe(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let { idVoluntary, idOrganization } = req.body
    let subscriptionExists = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
      status: 'pending'
    }})

    if (subscriptionExists) {
      return res.status(409).send({ message: "this subscription already exists and is pending"})
    }
    
    let orgRepository = getRepository(Organization)
    let organization = await orgRepository.findOne({ where: {id: idOrganization}})
    if (!organization) {
      return res.status(404).send({ message: "organization not found"})
    }
    
    let volRepository = getRepository(Voluntary)
    let voluntary = await volRepository.findOne({ where: {id: idVoluntary}})
    if (!voluntary) {
      return res.status(404).send({ message: "voluntary not found"})
    }

    const subscription = repository.create({organization, voluntary, status: 'pending'})
    await repository.save(subscription)
    return res.status(201).send(subscription)
  }

  async accept(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let { idVoluntary, idOrganization } = req.body
    const subscription = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
      status: 'pending'
    }})

    if (!subscription) {
      return res.status(404).send({ message: "subscription not found"})
    }

    let orgRepository = getRepository(Organization)
    let organization = await orgRepository.findOne({ where: {id: idOrganization}})
    if (!organization) {
      return res.status(404).send({ message: "organization not found"})
    }
    
    let volRepository = getRepository(Voluntary)
    let voluntary = await volRepository.findOne({ where: {id: idVoluntary}})
    if (!voluntary) {
      return res.status(404).send({ message: "voluntary not found"})
    }
    
    let jobRepository = getRepository(Job)
    let job = await jobRepository.create({ organization, voluntary, status: 'in progress'})
    await jobRepository.save(job)
    subscription.status = 'accepted'
    await repository.save(subscription)
    return res.status(200).send(subscription)
  }

  async reject(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let { idVoluntary, idOrganization } = req.body
    const subscription = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
      status: 'pending'
    }})

    if (!subscription) {
      return res.status(404).send({ message: "subscription not found"})
    }

    subscription.status = 'rejected'
    await repository.save(subscription)
    return res.status(200).send(subscription)
  }

  async cancel(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let { idVoluntary, idOrganization } = req.body
    const subscription = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
      status: 'pending'
    }})

    if (!subscription) {
      return res.status(404).send({ message: "subscription not found"})
    }

    subscription.status = 'cancelled'
    await repository.save(subscription)
    return res.status(200).send(subscription)
  }

  async getByOrganization(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let id = req.params.id
    let subscription = await repository.findOne({ where: { idOrganization: id } })
    return res.status(200).send(subscription)
  }

  async getByVoluntary(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let id = req.params.email
    let subscription = await repository.findOne({ where: { idVoluntary: id } })
    return res.status(200).send(subscription)
  }
}

export default new SubscriptionController()