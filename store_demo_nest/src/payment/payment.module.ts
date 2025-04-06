import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { DaiLy } from '../dai-ly/model/dai-ly-model';

@Module({
    imports: [
      SequelizeModule.forFeature([Payment, DaiLy]),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
  })
  export class PaymentModule {}