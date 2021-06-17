import { Invite } from "./invite-model";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Organization } from "../organization/organization-model";
import { Voluntary } from "../voluntary/voluntary-model";
import { Job } from '../job/job-model';

class OrganizationController {

  async invite(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let { voluntaryId, organizationId } = req.body
    let inviteExists = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
      status: 'pending'
    }})

    if (inviteExists) {
      return res.status(409).send({ message: "this invite already exists and is pending"})
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

    const invite = repository.create({organization, voluntary, status: 'pending'})
    await repository.save(invite)
    return res.status(201).send(invite)
  }

  async accept(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let { voluntaryId, organizationId } = req.body
    const invite = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
      status: 'pending'
    }})

    if (!invite) {
      return res.status(404).send({ message: "invite not found"})
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

    invite.status = 'accepted'
    let jobRepository = getRepository(Job)
    let job = await jobRepository.create({ organization, voluntary, status: 'in progress'})
    await jobRepository.save(job)
    await repository.save(invite)
    return res.status(200).send(invite)
  }

  async reject(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let { voluntaryId, organizationId } = req.body
    const invite = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
      status: 'pending'
    }})

    if (!invite) {
      return res.status(404).send({ message: "invite not found"})
    }

    invite.status = 'rejected'
    await repository.save(invite)
    return res.status(200).send(invite)
  }

  async cancel(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let { voluntaryId, organizationId } = req.body
    const invite = await repository.findOne({ where: { 
      organization: organizationId, 
      voluntary: voluntaryId,
      status: 'pending'
    }})

    if (!invite) {
      return res.status(404).send({ message: "invite not found"})
    }

    invite.status = 'cancelled'
    await repository.save(invite)
    return res.status(200).send(invite)
  }

  async getByOrganization(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let id = req.params.id
    let invite = await repository.findOne({ where: { organization: id } })
    return res.status(200).send(invite)
  }

  async getByVoluntary(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let id = req.params.id
    let invite = await repository.findOne({ where: { voluntary: id } })
    return res.status(200).send(invite)
  }
}

export default new OrganizationController()