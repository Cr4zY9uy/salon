import * as bcrypt from 'bcrypt'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { AbstractEntity } from './abstract.entity'
@Entity()
export class User extends AbstractEntity {
  @Column({ length: 255 })
  password: string

  @Column({ length: 255 })
  username: string

  @Column({ length: 255, nullable: true })
  google_id?: string

  @BeforeInsert()
  async hashPasswordWhenInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @BeforeUpdate()
  async hashPasswordWhenUpdate(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  constructor(username: string, password: string, google_id?: string) {
    super()
    this.username = username
    this.google_id = google_id
    this.password = password
  }
}
