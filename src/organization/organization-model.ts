import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('organization')
export class Organization {

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public description: string

  @Column()
  public category: string

  @Column()
  public phone: string

  @Column()
  public street: string

  @Column()
  public number: number

  @Column()
  public zipCode: string

  @Column()
  public neighborhood: string

  @Column()
  public complement: string

  @Column()
  public photo: string

}