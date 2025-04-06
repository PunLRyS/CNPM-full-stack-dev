import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PhieuXuatHangHoa } from './model/phieu-xuat-hang-hoa.model';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PhieuXuatHangHoaService {
  constructor(
    @InjectModel(PhieuXuatHangHoa)
    private readonly phieuXuatHangHoaModel: typeof PhieuXuatHangHoa,
  ) {}

  async findAll(): Promise<PhieuXuatHangHoa[]> {
    return this.phieuXuatHangHoaModel.findAll();
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const { phieuXuatId, amount, paymentDate } = createPaymentDto;
    // Logic xử lý thanh toán, ví dụ: cập nhật trạng thái thanh toán của phiếu xuất
    const phieuXuat = await this.phieuXuatHangHoaModel.findByPk(phieuXuatId);
    if (!phieuXuat) {
      throw new Error('Phieu Xuat not found');
    }
    // Cập nhật thông tin thanh toán
    phieuXuat.paymentStatus = 'Paid';
    phieuXuat.paymentAmount = amount;
    phieuXuat.paymentDate = new Date(paymentDate);
    await phieuXuat.save();
    return { message: 'Payment successful' };
  }
}