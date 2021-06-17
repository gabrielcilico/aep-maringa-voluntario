import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Organization } from '../organization/organization-model'
import { Voluntary } from '../voluntary/voluntary-model';

@Entity('job')
export class Job {

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(type => Organization)
  public organization: Organization

  @ManyToOne(type => Voluntary)
  public voluntary: Voluntary

  @CreateDateColumn()
  public createdAt: Date

  @Column()
  public status: string

  @Column()
  public hoursRegistered: number 

}