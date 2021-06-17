import { Job } from "./job-model";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Organization } from "../organization/organization-model";
import { Voluntary } from '../voluntary/voluntary-model';

class OrganizationController {

  async save(req: Request, res: Response) {
    let repository = getRepository(Job)
    let { organizationId, voluntaryId } = req.body
    let jobExists = await repository.findOne({ where: [{ organizationId, voluntaryId }, {status: 'in progress'}] })

    if (jobExists) {
      return res.status(409).send({ message: "job already exists"})
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
    
    const job = repository.create({organization, voluntary, status: 'in progress'})
    await repository.save(job)
    return res.status(201).send(job)
  }

  async updateHour(req: Request, res: Response) {
    let repository = getRepository(Job)
    let { organizationId, voluntaryId, hoursRegistered } = req.body
    const job = await repository.findOne({ where: [{ organizationId, voluntaryId }, {status: 'in progress'}] })

    if (!job) {
      return res.status(404).send({ message: "job not found"})
    }

    job.hoursRegistered = hoursRegistered
    await repository.save(job)
    return res.send(200).send(job)
  }

  async close(req: Request, res: Response) {
    let repository = getRepository(Job)
    let { organizationId, voluntaryId } = req.body
    const job = await repository.findOne({ where: [{ organizationId, voluntaryId, status: 'in progress' }] })

    if (!job) {
      return res.status(404).send({ message: "job not found"})
    }

    job.status = "finished"
    await repository.save(job)
    return res.send(200).send(job)
  }

  async getByOrganization(req: Request, res: Response) {
    let repository = getRepository(Job)
    let id = req.params.id
    let job = await repository.findOne({ where: { organizationId: id } })
    return res.status(200).send(job)
  }

  async getByVoluntary(req: Request, res: Response) {
    let repository = getRepository(Job)
    let id = req.params.email
    let job = await repository.findOne({ where: { voluntaryId: id } })
    return res.status(200).send(job)
  }
}

export default new OrganizationController()