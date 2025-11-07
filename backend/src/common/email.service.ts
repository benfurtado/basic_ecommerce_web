import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST', 'smtp.gmail.com'),
      port: this.configService.get('EMAIL_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>It will expire in 10 minutes.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendOrderConfirmation(email: string, orderDetails: any): Promise<void> {
    const itemsHtml = orderDetails.items
      .map(
        (item: any) =>
          `<tr>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
          </tr>`,
      )
      .join('');

    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Order Confirmation',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Order ID: #${orderDetails.id}</p>
        <p>Order Date: ${new Date(orderDetails.createdAt).toLocaleString()}</p>
        <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <h3>Total Amount: $${orderDetails.totalAmount.toFixed(2)}</h3>
        <p>Status: ${orderDetails.status}</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

