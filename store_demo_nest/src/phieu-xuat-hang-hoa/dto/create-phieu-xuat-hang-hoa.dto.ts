import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePhieuXuatHangHoaDto {
  @IsString()
  @ApiProperty({ description: 'Mã Hàng Hóa' })
  maHangHoa: string;

  @IsString()
  @IsOptional()
  maPhieuXuat?: string;

  @IsString()
  @ApiProperty({ description: 'Số Lượng', required: true })
  soLuong?: number;

  @IsString()
  @ApiProperty({ description: 'Giá Nhập', required: true })
  giaNhap: number; // Thêm trường giaNhap
}
