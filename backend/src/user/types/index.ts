// get-user.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class QueryParams{
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pageSize?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  transactionId?: number;
}
