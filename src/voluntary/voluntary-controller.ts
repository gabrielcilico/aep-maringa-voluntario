import { Voluntary } from "./voluntary";
import { VoluntaryRepository } from "./voluntary-repository";
import { Request, Response } from "express";
class VoluntaryController {

  public repository: VoluntaryRepository
  
  contructor() {
    this.repository = new VoluntaryRepository();
  }

  async save(req: Request, res: Response) {
    let {name, email, birthdate, gender} = req.body
    let voluntary: Voluntary = new Voluntary({name, email, birthdate, gender})
    try {
      await this.repository.save(voluntary)
      res.status(201).send(voluntary)
    } catch (err) {
      res.status(502).send({ error: "operation failure" })
    }
  }

  async update(req: Request, res: Response) {
    let id: string = req.params.id
    let voluntary: Voluntary = await this.repository.get(id)

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
    res.status(200).send(voluntary)
  }
}

export default new VoluntaryController()