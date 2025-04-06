import { Module } from '@nestjs/common';
import { PhieuXuatHangHoaController } from './phieu-xuat-hang-hoa.controller';
import { PhieuXuatHangHoaService } from './phieu-xuat-hang-hoa.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhieuXuatHangHoa } from './model/phieu-xuat-hang-hoa.model';
import { PhieuXuat } from 'src/phieu-xuat/model/phieu-xuat-model';
import { HangHoa } from 'src/hang-hoa/model/hang-hoa.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PhieuXuatHangHoa, PhieuXuat, HangHoa]),
  ],
  controllers: [PhieuXuatHangHoaController],
  providers: [PhieuXuatHangHoaService],
})
export class PhieuXuatHangHoaModule {}