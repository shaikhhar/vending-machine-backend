/* eslint-disable prettier/prettier */
import { DepositMoneyDTO, PaymentModeEnum } from '../money.dtos';
import { Money } from '../money.entity';

let mockMoney: Money[] = [];

export const setMockMoney = ()=> {
  mockMoney =[
    {
      id: 1,
      paymentMode: PaymentModeEnum.coin,
      amount: 100,
    },
    {
      id: 2,
      paymentMode: PaymentModeEnum.cash,
      amount: 50,
    },
  ];
}

export const moneyRepositoryMockFactory = {
  find: jest.fn().mockImplementation(() => Promise.resolve(mockMoney)),
  findOne: jest
    .fn()
    .mockImplementation(({ paymentMode }) =>
      Promise.resolve(
        mockMoney.find((money) => money.paymentMode === paymentMode),
      ),
    ),
  save: jest.fn().mockImplementation((depositMoneyDTO: DepositMoneyDTO) => {
    const moneyIndex = mockMoney.findIndex(money => money.paymentMode === depositMoneyDTO.paymentMode);
    if (moneyIndex === -1) {
      const money = { id: mockMoney.length, ...depositMoneyDTO };
      mockMoney = [...mockMoney, money];
    } else {
      const moneyExisting = mockMoney[moneyIndex];
      mockMoney.splice(moneyIndex, 1, moneyExisting);
    }
    Promise.resolve(mockMoney);
  }),
};
