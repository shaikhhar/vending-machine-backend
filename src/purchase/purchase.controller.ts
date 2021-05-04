/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePurchaseDTO, RefundDTO } from './purchase.dto';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
    constructor(private purchaseService: PurchaseService){}
    @Post()
    async purchase(@Body() createPurchaseDTO: CreatePurchaseDTO) {
        return await this.purchaseService.createPurchase(createPurchaseDTO);
    }

    @Post('refund')
    async refund(@Body() refundDTO: RefundDTO) {
        return await this.purchaseService.refund(refundDTO);
    }
}
