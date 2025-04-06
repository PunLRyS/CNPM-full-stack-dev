import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'c8acca48-057e-488a-adf4-b0ff0fc7503b', description: 'Mã phiếu xuất' })
  phieuXuatId: string;

  @ApiProperty({ example: 1000000, description: 'Số tiền thanh toán' })
  amount: number;

  @ApiProperty({ example: '2025-03-10', description: 'Ngày thanh toán' })
  paymentDate: string;
}