import { uuid } from 'uuidv4'

export class Entity {
  
  public readonly id: string
  public name: string
  public email: string
  public description: string
  public group: string
  public street: string
  public number: number
  public zipCode: string
  public neighborhood: string
  public complement: string
  public photo: string
  public website: string
  public instagram: string
  public facebook: string
  public twitter: string

  constructor(props: Omit<Entity, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

}