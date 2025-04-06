import { Module, forwardRef } from '@nestjs/common';
import { BillNhapService } from './bill-nhap.service';
import { BillNhapController } from './bill-nhap.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BillNhap } from './model/bill-nhap-model';
import { HangHoa } from 'src/hang-hoa/model/hang-hoa.model';
import { PhieuNhap } from 'src/phieu-nhap/model/phieu-nhap-model';
import { HangHoaModule } from 'src/hang-hoa/hang-hoa.module';
import { PhieuNhapModule } from 'src/phieu-nhap/phieu-nhap.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PhieuNhap]),
    SequelizeModule.forFeature([HangHoa]),
    SequelizeModule.forFeature([BillNhap]),
    HangHoaModule,
    forwardRef(() => PhieuNhapModule),
  ],
  controllers: [BillNhapController],
  providers: [BillNhapService],
  exports: [BillNhapService, SequelizeModule.forFeature([BillNhap])],
})
export class BillNhapModule {}