import { uuid } from 'uuidv4'

export class Voluntary {
  
  public readonly id: string
  public name: string
  public email: string
  public birthdate: Date
  public gender: string

  constructor(props: Omit<Voluntary, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

}