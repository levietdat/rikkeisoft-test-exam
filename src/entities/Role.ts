import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEnitty";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity("Role")
export class Role extends BaseEntity {
  @Column({ type: "text" })
  roleCode: string;

  @Column({ type: "text", nullable: true })
  roleName: string;

  @OneToMany(() => Permission, (per) => per.role)
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
