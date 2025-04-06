import { Controller, Get } from '@nestjs/common';
import { BillAnalysisService } from './bill-analysis.service';

@Controller('bill-analysis')
export class BillAnalysisController {
  constructor(private readonly billAnalysisService: BillAnalysisService) {}

  @Get()
  async analyzeBills(): Promise<string> {
    return await this.billAnalysisService.analyzeBills();
  }
}