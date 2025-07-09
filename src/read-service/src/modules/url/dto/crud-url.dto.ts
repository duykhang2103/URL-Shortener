import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Pagination } from 'src/core/dto/dto-common.dto';

export class UrlDto {
  @ApiProperty({
    description: 'original url',
    required: true,
  })
  @IsNotEmpty()
  original: string;

  @ApiProperty({
    description: 'short code',
    required: true,
  })
  @IsNotEmpty()
  shortCode: string;

  @ApiProperty({
    description: 'password',
    required: false,
  })
  password?: string;
  @ApiProperty({
    description: 'number of clicks',
    required: false,
    default: 0,
  })
  numOfClicks?: number;
  @ApiProperty({
    description: 'last clicked at',
    required: false,
    type: Date,
  })
  lastClickedAt?: Date;
  @ApiProperty({
    description: 'expires at',
    required: false,
    type: Date,
  })
  expiresAt?: Date;
  @ApiProperty({
    description: 'created at',
    required: false,
    type: Date,
  })
  createdAt?: Date;
  @ApiProperty({
    description: 'updated at',
    required: false,
    type: Date,
  })
  updatedAt?: Date;
}

export class FilterUrlDto extends PartialType(Pagination) {}
