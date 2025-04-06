import { Controller, Get, Post, Body } from '@nestjs/common';
import { PhieuXuatHangHoaService } from './phieu-xuat-hang-hoa.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PhieuXuatHangHoa } from './model/phieu-xuat-hang-hoa.model';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('PhieuXuatHangHoa')
@Controller('phieu-xuat-hang-hoa')
export class PhieuXuatHangHoaController {
  constructor(
    private readonly phieuXuatHangHoaService: PhieuXuatHangHoaService,
  ) {}

  @Get('get-du-lieu')
  @ApiOperation({ summary: 'Lấy Dữ liệu Hàng Hóa hàng hóa cho phiếu xuất' })
  @ApiResponse({ status: 201, type: PhieuXuatHangHoa })
  findOne() {
    return this.phieuXuatHangHoaService.findAll();
  }

  @Post('thanh-toan')
  @ApiOperation({ summary: 'Thanh toán cho phiếu xuất' })
  @ApiResponse({ status: 201, description: 'Thanh toán thành công' })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.phieuXuatHangHoaService.createPayment(createPaymentDto);
  }
}