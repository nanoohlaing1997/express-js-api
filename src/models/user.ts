import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number = undefined!

  @Column()
  name?: string

  @Column()
  email?: string

  @Column()
  password?: string
}
