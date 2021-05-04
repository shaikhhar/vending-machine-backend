export class CreatePurchaseDTO {
  productName: string;
  pur_quantity: number;
  paymentMode: string;
  pur_amount: number;
}

export class RefundDTO {
  productName: string;
}
