import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DaiLyService } from './dai-ly.service';
import { CreateDaiLyDto } from './dto/create-dai-ly.dto';
import { DaiLy } from './model/dai-ly-model';
import { UpdateDaiLyDto } from './dto/update-dai-ly-body';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Dai Ly')
@Controller('daily')
export class DaiLyController {
  constructor(private readonly daiLyService: DaiLyService) {}

  @Get('search')
  @ApiOperation({ summary: 'Tìm kiếm đại lý theo tên' })
  searchDaiLy(@Query('ten') ten: string): Promise<DaiLy[]> {
    return this.daiLyService.searchDaiLy(ten);
  }

  @Get('/get-by-id/:id')
  findDaiLyById(@Param('id') id: string): Promise<DaiLy> {
    return this.daiLyService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get dữ liệu danh sách đại lý' })
  findAllDaiLy(): Promise<DaiLy[]> {
    return this.daiLyService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo Đại Lý' })
  createDaiLy(@Body() createDaiLyDto: CreateDaiLyDto): Promise<DaiLy> {
    return this.daiLyService.createDaiLy(createDaiLyDto);
  }

  @Put('/edit/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin đại lý' })
  updateDaiLy(
    @Param('id') id: string,
    @Body() updateDaiLyDto: UpdateDaiLyDto,
  ): Promise<[number, DaiLy[]]> {
    return this.daiLyService.updateDaiLy(id, updateDaiLyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hủy tạo đại lý' })
  deleteDaiLy(@Param('id') id: string): Promise<void> {
    return this.daiLyService.deleteDaiLy(id);
  }

  @Post('add-dai-ly/-phieu-xuat')
  @ApiOperation({ summary: 'Tạo đại lý' })
  async addDaiLyToPhieuXuast(@Body() data: CreateDaiLyDto): Promise<DaiLy> {
    return this.daiLyService.addDaiLyToPhieuXuast(data);
  }

  // API: Lấy đại lý theo mã
  @Get('/get-by-ma/:ma')
  @ApiOperation({ summary: 'Tìm Kiếm Thông Tin Đại Lý Theo Mã' })
  findDaiLyByMa(@Param('ma') ma: string): Promise<DaiLy> {
    return this.daiLyService.findByMa(ma);
  }
}
