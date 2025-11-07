import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { EmailService } from '../common/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async sendOTP(email: string) {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes

    // Find or create user
    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({ email });
    }

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await this.userRepository.save(user);

    // Send OTP via email
    await this.emailService.sendOTP(email, otp);

    return { message: 'OTP sent to your email', success: true };
  }

  async verifyOTP(email: string, otp: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !user.otp) {
      return { message: 'Invalid email or OTP not sent', success: false };
    }

    if (user.otp !== otp) {
      return { message: 'Invalid OTP', success: false };
    }

    if (new Date() > user.otpExpiry) {
      return { message: 'OTP expired', success: false };
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await this.userRepository.save(user);

    return {
      message: 'OTP verified successfully',
      success: true,
      user: { id: user.id, email: user.email },
    };
  }

  async getUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return { id: user.id, email: user.email };
  }
}

