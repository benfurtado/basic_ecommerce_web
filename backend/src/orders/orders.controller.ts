import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

export class CreateOrderDto {
  userId: number;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('user/:userId')
  async getUserOrders(@Param('userId') userId: number) {
    return this.ordersService.getUserOrders(userId);
  }
}

