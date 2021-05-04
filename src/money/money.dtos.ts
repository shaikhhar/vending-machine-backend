export class DepositMoneyDTO {
  paymentMode: PaymentModeEnum;
  amount: number;
}

export enum PaymentModeEnum {
  'coin',
  'cash',
}
export class WithdrawMoneyDTO {
  paymentMode: PaymentModeEnum;
  amount: number;
}
