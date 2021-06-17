import { Subscription } from "./subscription-model";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Organization } from "../organization/organization-model";
import { Voluntary } from "../voluntary/voluntary-model";
import { Job } from '../job/job-model';

class SubscriptionController {

  async subscribe(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let { voluntaryId, organizationId } = req.body
    let subscriptionExists = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
      status: 'pending'
    }})

    if (subscriptionExists) {
      return res.status(409).send({ message: "this subscription already exists and is pending"})
    }
    
    let orgRepository = getRepository(Organization)
    let organization = await orgRepository.findOne({ where: {id: organizationId}})
    if (!organization) {
      return res.status(404).send({ message: "organization not found"})
    }
    
    let volRepository = getRepository(Voluntary)
    let voluntary = await volRepository.findOne({ where: {id: voluntaryId}})
    if (!voluntary) {
      return res.status(404).send({ message: "voluntary not found"})
    }

    const subscription = repository.create({organization, voluntary, status: 'pending'})
    await repository.save(subscription)
    return res.status(201).send(subscription)
  }

  async accept(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let { voluntaryId, organizationId } = req.body
    const subscription = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
      status: 'pending'
    }})

    if (!subscription) {
      return res.status(404).send({ message: "subscription not found"})
    }

    let orgRepository = getRepository(Organization)
    let organization = await orgRepository.findOne({ where: {id: organizationId}})
    if (!organization) {
      return res.status(404).send({ message: "organization not found"})
    }
    
    let volRepository = getRepository(Voluntary)
    let voluntary = await volRepository.findOne({ where: {id: voluntaryId}})
    if (!voluntary) {
      return res.status(404).send({ message: "voluntary not found"})
    }
    
    let jobRepository = getRepository(Job)
    let job = await jobRepository.create({ organization, voluntary, hoursRegistered: 0, status: 'in progress'})
    await jobRepository.save(job)
    subscription.status = 'accepted'
    await repository.save(subscription)
    return res.status(200).send(subscription)
  }

  async reject(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let { voluntaryId, organizationId } = req.body
    const subscription = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
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
    let { voluntaryId, organizationId } = req.body
    const subscription = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
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
    let subscription = await repository.findOne({ where: { organization: id } })
    return res.status(200).send(subscription)
  }

  async getByVoluntary(req: Request, res: Response) {
    let repository = getRepository(Subscription)
    let id = req.params.id
    let subscription = await repository.findOne({ where: { voluntary: id } })
    return res.status(200).send(subscription)
  }
}

export default new SubscriptionController()