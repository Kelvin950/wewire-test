import { IsString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class ConvertDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
