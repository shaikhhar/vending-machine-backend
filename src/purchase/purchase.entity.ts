/* eslint-disable prettier/prettier */
import { Product } from '../product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne((type) => Product)
  @JoinColumn()
  product: Product;

  @Column()
  total: number;
}
