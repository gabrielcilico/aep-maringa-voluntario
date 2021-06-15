import { Voluntary } from "./voluntary";

export class VoluntaryRepository {

  async save(voluntary: Voluntary) : Promise<Voluntary> {
    return voluntary
  }

  async update(voluntary: Voluntary) {}

  async delete(id: string) {}

  async get(id: string) : Promise<Voluntary> {
    return undefined
  }

  getAll() : Promise<Voluntary[]> {
    return undefined
  }

}