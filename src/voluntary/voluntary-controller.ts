import { Voluntary } from "./voluntary";
import { VoluntaryRepository } from "./voluntary-repository";
import { Request, Response } from "express";

export class VoluntaryController {

  public repository: VoluntaryRepository
  
  contructor() {
    this.repository = new VoluntaryRepository();
  }

  async save(req: Request, res: Response): Voluntary {
    let {name, email, birthdate, gender} = req.body
    let voluntary: Voluntary = new Voluntary({name, email, birthdate, gender})
    return await this.repository.save(voluntary)
  }

  async update(req: Request, res: Response) {
    let id: string = req.params.id
    let voluntary: Voluntary = this.repository.get(id)

    if (!voluntary) {
      res.status(404).send({ error: "voluntary not found" })
    }

    let {name, email, birthdate, gender} = req.body

    if (name) {
      voluntary.name = name
    }

    if (email) {
      voluntary.email = email
    }

    if (birthdate) {
      voluntary.birthdate = birthdate
    }

    if (gender) {
      voluntary.gender = gender
    }

    await this.repository.update(voluntary)
  }
}