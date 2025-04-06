import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BillXuat } from '../bill-xuat/model/bill-xuat-model';

@Injectable()
export class BillAnalysisService {
  constructor(
    @InjectModel(BillXuat)
    private readonly billXuatModel: typeof BillXuat,
  ) {}

  async analyzeBills(): Promise<string> {
    const bills = await this.billXuatModel.findAll();


    const totalProductsSold = bills.reduce((total, bill) => total + bill.quantity, 0);

    return `Tổng số lượng sản phẩm đã bán: ${totalProductsSold}. Dự đoán nhu cầu khách hàng trong tương lai dựa trên phân tích bill.`;
  }
}