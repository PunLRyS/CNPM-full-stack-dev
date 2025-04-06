import { Injectable } from '@nestjs/common';
import { BillNhap } from './model/bill-nhap-model';
import { InjectModel } from '@nestjs/sequelize';
import { HangHoa } from 'src/hang-hoa/model/hang-hoa.model';
import { HangHoaService } from 'src/hang-hoa/service/hang-hoa.service';
import { PhieuNhap } from 'src/phieu-nhap/model/phieu-nhap-model';

@Injectable()
export class BillNhapService {
  constructor(
    @InjectModel(BillNhap) private readonly billNhapModel: typeof BillNhap,
    @InjectModel(PhieuNhap) private readonly phieuNhapModel: typeof PhieuNhap,
    @InjectModel(HangHoa) private readonly hangHoaModel: typeof HangHoa,
    private readonly hangHoaService: HangHoaService,
  ) {}

  async createBillNhap(
    maPhieuNhap: string,
    maHangHoa: string,
    quantity: number,
  ): Promise<BillNhap> {
    const hangHoa = await this.hangHoaService.findHangHoaByMa(maHangHoa);
    if (!hangHoa) {
      throw new Error('Hàng hóa không tồn tại');
    }

    if (hangHoa.soLuong < quantity) {
      throw new Error('Số lượng hàng hóa không đủ');
    }

    const unitPrice = hangHoa.giaNhap * 1.08; // Giả sử giá bán = giá nhập * 1.08
    const totalPrice = unitPrice * quantity;

    const newBillNhap = await this.billNhapModel.create({
      maPhieuNhap,
      maHangHoa,
      productName: hangHoa.ten,
      quantity,
      unitPrice,
      totalPrice,
    });

    // // Bước 5: Giảm số lượng hàng hóa sau khi tạo Bill Xuất
    // await this.hangHoaService.updateHangHoa(
    //   hangHoa.ma,
    //   hangHoa.soLuong - quantity,
    // );

    return newBillNhap;
  }

  async calculateTotalAmount(maPhieuNhap: string): Promise<number> {
    // Lấy tất cả các Bill Xuất thuộc về phiếu xuất cụ thể
    const bills = await this.billNhapModel.findAll({
      where: { maPhieuNhap },
    });

    // Tính tổng của tất cả các `totalPrice` trong các Bill Xuất
    return bills.reduce((sum, bill) => sum + bill.totalPrice, 0);
  }
}
