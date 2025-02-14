import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HangHoa } from 'src/hang-hoa/model/hang-hoa.model';
import { PhieuXuatHangHoa } from 'src/phieu-xuat-hang-hoa/model/phieu-xuat-hang-hoa.model';
import { PhieuXuat } from './model/phieu-xuat-model';
import { CreatePhieuXuatDto } from './dto/create-phieu-xuat.body.dto';

@Injectable()
export class PhieuXuatService {
  constructor(
    @InjectModel(PhieuXuat) private readonly phieuXuatModel: typeof PhieuXuat,
    @InjectModel(HangHoa) private readonly hangHoaModel: typeof HangHoa,
    @InjectModel(PhieuXuatHangHoa)
    private readonly phieuXuatHangHoaModel: typeof PhieuXuatHangHoa,
  ) {}

  async placeOrder(
    createPhieuXuatDto: CreatePhieuXuatDto,
    maDaiLy: string,
  ): Promise<string> {
    const { danhSachHangHoa } = createPhieuXuatDto;

    for (const item of danhSachHangHoa) {
      const hangHoa = await this.hangHoaModel.findOne({
        where: { ma: item.maHangHoa },
      });
      if (!hangHoa || hangHoa.soLuong < item.soLuong) {
        throw new BadRequestException(
          `Không đủ số lượng để xuất với mã: ${item.maHangHoa}`,
        );
      }
    }

    // Step 2: Deduct stock and create an export receipt
    const phieuXuat = await this.phieuXuatModel.create({
      ma: createPhieuXuatDto.ma,
      totalAmount: 0, // to be calculated
    });

    let totalAmount = 0;
    for (const item of danhSachHangHoa) {
      const hangHoa = await this.hangHoaModel.findOne({
        where: { ma: item.maHangHoa },
      });

      // Deduct the quantity
      hangHoa.soLuong -= item.soLuong;
      await hangHoa.save();

      const amount = item.giaNhap * item.soLuong;

      // Create a record in the PhieuXuatHangHoa table
      await this.phieuXuatHangHoaModel.create({
        maPhieuXuat: phieuXuat.ma,
        maHangHoa: item.maHangHoa,
        soLuong: item.soLuong,
        giaNhap: item.giaNhap || 0,
        // Add any additional relevant information here
      });

      // Update total amount
      totalAmount += amount;
    }

    // Step 3: Update the total amount of the receipt
    phieuXuat.totalAmount = totalAmount;
    await phieuXuat.save();

    // Step 4: Create association with the agency (maDaiLy)
    // (Assuming there is a field to store agency ID)
    await phieuXuat.update({ maDaiLy });

    return phieuXuat.ma;
  }

  async findAll(): Promise<PhieuXuat[]> {
    return this.phieuXuatModel.findAll();
  }

  async deletePhieuXuat(id: string): Promise<void> {
    const PhieuXuat = await this.phieuXuatModel.findByPk(id);
    await PhieuXuat.destroy();
  }

  async findPhieuXuatByMa(ma: string): Promise<PhieuXuat> {
    const phieuXuat = await this.phieuXuatModel.findOne({
      where: { ma },
    });

    if (!phieuXuat) {
      throw new NotFoundException(`Không tìm thấy phiếu xuất với mã ${ma}`);
    }

    return phieuXuat;
  }
}
