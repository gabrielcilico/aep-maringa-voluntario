import { Invite } from "./invite-model";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Organization } from "../organization/organization-model";
import { Voluntary } from "../voluntary/voluntary-model";

class OrganizationController {

  async invite(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let { idVoluntary, idOrganization } = req.body
    let inviteExists = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
      status: 'pending'
    }})

    if (inviteExists) {
      return res.status(409).send({ message: "this invite already exists and is pending"})
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

    const invite = repository.create({organization, voluntary, status: 'pending'})
    await repository.save(invite)
    return res.status(201).send(invite)
  }

  async accept(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let { idVoluntary, idOrganization } = req.body
    const invite = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
      status: 'pending'
    }})

    if (!invite) {
      return res.status(404).send({ message: "invite not found"})
    }

    invite.status = 'accepted'

    // TODO: Deve gerar um registro de trabalho com status em aberto

    await repository.save(invite)
    return res.status(200).send(invite)
  }

  async reject(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let { idVoluntary, idOrganization } = req.body
    const invite = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
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
    let { idVoluntary, idOrganization } = req.body
    const invite = await repository.findOne({ where: { 
      id_organization: idOrganization, 
      id_voluntary: idVoluntary,
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
    let invite = await repository.findOne({ where: { idOrganization: id } })
    return res.status(200).send(invite)
  }

  async getByVoluntary(req: Request, res: Response) {
    let repository = getRepository(Invite)
    let id = req.params.email
    let invite = await repository.findOne({ where: { idVoluntary: id } })
    return res.status(200).send(invite)
  }
}

export default new OrganizationController()