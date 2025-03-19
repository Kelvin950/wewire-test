import { IsString, IsInt , IsEmail } from 'class-validator';

export class ConvertDto {


@IsString()
 from:string  ;

@IsString()
 to:string ; 

 @IsInt()
 amount:number
}