import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, PaymentResponseDto } from './payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo thanh toán mới' })
  @ApiResponse({ status: 201, description: 'Thanh toán được tạo thành công', type: PaymentResponseDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thanh toán theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin thanh toán', type: PaymentResponseDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thanh toán' })
  async getPaymentById(@Param('id') id: string): Promise<PaymentResponseDto> {
    return this.paymentService.getPaymentById(id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Lấy danh sách thanh toán theo ID khách hàng' })
  @ApiResponse({ status: 200, description: 'Danh sách thanh toán', type: [PaymentResponseDto] })
  async getPaymentsByCustomerId(@Param('customerId') customerId: string): Promise<PaymentResponseDto[]> {
    return this.paymentService.getPaymentsByCustomerId(customerId);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách thanh toán' })
  @ApiResponse({ status: 200, description: 'Danh sách thanh toán', type: [PaymentResponseDto] })
  async getAllPayments(): Promise<PaymentResponseDto[]> {
    return this.paymentService.getAllPayments();
  }
}