import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('voluntary')
export class Voluntary {
  
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public birthdate: Date

  @Column()
  public gender: string
}