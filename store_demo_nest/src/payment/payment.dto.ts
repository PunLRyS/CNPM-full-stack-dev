import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Số tiền thanh toán', example: 100000 })
  amount: number;

  @ApiProperty({ description: 'Loại tiền tệ', example: 'VND' })
  currency: string;

  @ApiProperty({ description: 'Phương thức thanh toán', example: 'credit_card' })
  paymentMethod: string;

  @ApiProperty({ description: 'Mô tả giao dịch', required: false, example: 'Thanh toán đơn hàng #123' })
  description?: string;

  @ApiProperty({ description: 'ID của khách hàng', example: 'cust_123456' })
  customerId: string;

  @ApiProperty({ description: 'Tên đại lý', example: 'Đại lý A' })
  agencyName: string;

  @ApiProperty({ description: 'Mã đại lý', example: 'DL001' })
  agencyCode: string;
}

export class PaymentResponseDto {
  @ApiProperty({ description: 'Mã thanh toán' })
  id: string;

  @ApiProperty({ description: 'Số tiền thanh toán' })
  amount: number;

  @ApiProperty({ description: 'Loại tiền tệ' })
  currency: string;

  @ApiProperty({ description: 'Phương thức thanh toán' })
  paymentMethod: string;

  @ApiProperty({ description: 'Trạng thái thanh toán', example: 'completed' })
  status: string;

  @ApiProperty({ description: 'Thời gian tạo giao dịch' })
  createdAt: Date;

  @ApiProperty({ description: 'Mã giao dịch từ cổng thanh toán', required: false })
  transactionId: string;

  @ApiProperty({ description: 'Tên đại lý' })
  agencyName: string;
  
  @ApiProperty({ description: 'Mã đại lý' })
  agencyCode: string;

}