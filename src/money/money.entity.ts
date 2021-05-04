import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentModeEnum } from './money.dtos';

@Entity()
export class Money {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentMode: PaymentModeEnum;

  @Column()
  amount: number;
}
