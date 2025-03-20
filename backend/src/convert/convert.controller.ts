import { Body, Controller , Post, UseGuards } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { NonceGuard } from '../nonce/nonce.guard';

@Controller('convert')
export class ConvertController {

    constructor(private convertService:ConvertService){

    }

    @UseGuards(NonceGuard)
    @UseGuards(AuthGuard)
    @Post()
     Postconvert(@Body() dto:ConvertDto , @GetUser() user:User){
        console.log(user)
        return this.convertService.Postconvert(dto , user);
     }
}
