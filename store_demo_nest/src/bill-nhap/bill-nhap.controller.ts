import { Controller, Post, Get, Param, Query } from '@nestjs/common';
import { BillNhapService } from './bill-nhap.service';
import { BillNhap } from './model/bill-nhap-model';
import { ApiTags } from '@nestjs/swagger';

@Controller('bill-nhap')
@ApiTags('Bill nhap')
export class BillNhapController {
  constructor(private readonly billNhapService: BillNhapService) {}

  // Endpoint để tạo Bill Xuất
  @Post('create/:maPhieunhap')
  async createBillnhap(
    @Param('maPhieunhap') maPhieunhap: string,
    @Query('maHangHoa') maHangHoa: string,
    @Query('quantity') quantity: number,
  ): Promise<BillNhap> {
    try {
      return await this.billNhapService.createBillNhap(
        maPhieunhap,
        maHangHoa,
        quantity,
      );
    } catch (error) {
      throw new Error(`Lỗi khi tạo Bill Xuất: ${error.message}`);
    }
  }

  // Endpoint để tính tổng tiền của Phiếu Xuất
  @Get(':maPhieunhap/total/:maPhieunhap')
  async getTotalAmount(
    @Param('maPhieunhap') maPhieunhap: string,
  ): Promise<number> {
    try {
      return await this.billNhapService.calculateTotalAmount(maPhieunhap);
    } catch (error) {
      throw new Error(`Lỗi khi tính tổng tiền: ${error.message}`);
    }
  }
}
