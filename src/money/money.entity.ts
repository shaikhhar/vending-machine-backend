import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Money {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentMode: string;

  @Column()
  amount: number;
}
