import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./BaseEnitty";
import { Role } from "./Role";

@Entity("Permission")
export class Permission extends BaseEntity {
  @Column({ type: "text" })
  permissionCode: string;

  @Column({ type: "text", nullable: true })
  permissionDesc: string;

  @Column({ type: "text", nullable: true })
  permissionName: string;

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
