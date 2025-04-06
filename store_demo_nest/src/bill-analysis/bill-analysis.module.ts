import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BillAnalysisController } from './bill-analysis.controller';
import { BillAnalysisService } from './bill-analysis.service';
import { BillXuatModule } from '../bill-xuat/bill-xuat.module'; 
import { BillXuat } from '../bill-xuat/model/bill-xuat-model'; 

@Module({
  imports: [SequelizeModule.forFeature([BillXuat]), BillXuatModule], 
  controllers: [BillAnalysisController],
  providers: [BillAnalysisService],
})
export class BillAnalysisModule {}