import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentDto, PaymentResponseDto } from './payment.dto';
import { v4 as uuidv4 } from 'uuid';
import { Payment } from './payment.entity';
import { DaiLy } from '../dai-ly/model/dai-ly-model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
    @InjectModel(DaiLy)
    private readonly daiLyModel: typeof DaiLy, // Inject DaiLy model
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const { agencyName, agencyCode } = createPaymentDto;

    // Kiểm tra xem đại lý có tồn tại không
    const daiLy = await this.daiLyModel.findOne({
      where: { ten: agencyName, ma: agencyCode },
    });

    if (!daiLy) {
      throw new NotFoundException(
        `Không tìm thấy đại lý với tên "${agencyName}" và mã "${agencyCode}".`,
      );
    }

    // Tạo thanh toán
    const payment = await this.paymentModel.create({
      id: uuidv4(),
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      paymentMethod: createPaymentDto.paymentMethod,
      description: createPaymentDto.description,
      customerId: createPaymentDto.customerId,
      status: 'completed',
      transactionId: uuidv4(),
      agencyName: daiLy.ten,
      agencyCode: daiLy.ma,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      createdAt: payment.createdAt,
      transactionId: payment.transactionId,
      agencyName: payment.agencyName,
      agencyCode: payment.agencyCode,
    };
  }

  async getPaymentById(id: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentModel.findByPk(id);

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return {
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      createdAt: payment.createdAt,
      transactionId: payment.transactionId,
      agencyName: payment.agencyName,
      agencyCode: payment.agencyCode,
    };
  }

  async getPaymentsByCustomerId(customerId: string): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentModel.findAll({ where: { customerId } });

    return payments.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      createdAt: payment.createdAt,
      transactionId: payment.transactionId,
      agencyName: payment.agencyName,
      agencyCode: payment.agencyCode,
    }));
  }

  async getAllPayments(): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentModel.findAll();

    return payments.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      createdAt: payment.createdAt,
      transactionId: payment.transactionId,
      agencyName: payment.agencyName,
      agencyCode: payment.agencyCode,
    }));
  }

  private async processPaymentWithGateway(paymentData: CreatePaymentDto): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return uuidv4();
  }
}