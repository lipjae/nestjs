import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  signupVerifyToken: string

}