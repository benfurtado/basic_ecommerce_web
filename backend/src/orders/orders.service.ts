import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { EmailService } from '../common/email.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async createOrder(orderData: {
    userId: number;
    items: any[];
    totalAmount: number;
  }) {
    const user = await this.userRepository.findOne({
      where: { id: orderData.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const order = this.orderRepository.create({
      userId: orderData.userId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'confirmed',
    });

    const savedOrder = await this.orderRepository.save(order);

    // Send order confirmation email
    await this.emailService.sendOrderConfirmation(user.email, savedOrder);

    return savedOrder;
  }

  async getUserOrders(userId: number) {
    return this.orderRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}

