import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { BaseEntity } from "./BaseEnitty";

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal")
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
