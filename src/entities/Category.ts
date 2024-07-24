import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product";
import { BaseEntity } from "./BaseEnitty";

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  key: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
