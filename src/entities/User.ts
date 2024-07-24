import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./BaseEnitty";
import { Role } from "./Role";

@Entity("User")
export class User extends BaseEntity {
  @Column({ type: "text" })
  email: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
