/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';
import { Repository } from 'typeorm';
import { CreatePurchaseDTO, RefundDTO } from './purchase.dto';
import { Purchase } from './purchase.entity';
import { getConnection } from 'typeorm';
import { Money } from '../money/money.entity';

@Injectable()
export class PurchaseService {
    constructor(@InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
                @InjectRepository(Product) private productRepository: Repository<Product>,
                @InjectRepository(Money) private moneyRepository: Repository<Money>) {}

    async createPurchase(createPurchaseDTO: CreatePurchaseDTO) {
        const { productName, paymentMode, pur_quantity, pur_amount} = createPurchaseDTO;
        const product:Product = await this.productRepository.findOne({ name: productName });
        const totalCost = product.cost * pur_quantity;
        if( pur_amount < totalCost) {
            throw new HttpException('Insufficient cash to purchase ', HttpStatus.UNAUTHORIZED);
        }
        if( product.quantity < pur_quantity ) {
            throw new HttpException('Insufficient quantity of product ', HttpStatus.UNAUTHORIZED);
        }
        product.quantity = product.quantity - pur_quantity; 
        const money: Money = await this.moneyRepository.findOne({ paymentMode})
        const refund = pur_amount - totalCost;
        money.amount =money.amount + pur_amount - refund;
        // run transaction
        await getConnection().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(product);
            await transactionalEntityManager.save(money);
            // uncomment below to save transaction history
            // await transactionalEntityManager.save(createPurchaseDTO)
        })
        return {...createPurchaseDTO, refund }
    }

    // assumption: Only one product can be refunded at once
    async refund(refundDTO: RefundDTO){
        const product:Product = await this.productRepository.findOne({ name: refundDTO.productName });
        product.quantity++ ;
        const coin:Money = await this.moneyRepository.findOne({ paymentMode: "coin" });
        const cash = await this.moneyRepository.findOne({ paymentMode: "cash" });

        if(product.cost > (coin.amount + (cash?.amount || 0))){
            throw new HttpException('Unable to Refund, try again later', HttpStatus.UNAUTHORIZED);
        }
        let refund = {}
        if(product.cost <= coin.amount ){
            // sufficient coin
            coin.amount = coin.amount - product.cost;
            refund = {"coin": product.cost};
        }else if(cash){
            // insufficient coin
            const deficitCoin = product.cost - coin.amount;
            cash.amount = cash.amount - deficitCoin;
            refund = {"coin": coin.amount  , "cash":deficitCoin}
            coin.amount = 0;            
        }
        await getConnection().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(product);
            await transactionalEntityManager.save(coin);
            if(cash)  await transactionalEntityManager.save(cash);
            // can save transaction related to refund
        })
        return {...refundDTO, ...refund}
        
    }

}
