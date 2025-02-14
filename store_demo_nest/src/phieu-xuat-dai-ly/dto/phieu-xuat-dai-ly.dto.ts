import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePhieuXuatDaiLyDto {
  @IsString()
  @IsOptional()
  maDaiLy?: string;

  @IsString()
  @ApiProperty({ description: 'Mã Phiếu Xuất' })
  maPhieuXuat: string;
}
