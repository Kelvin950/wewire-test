import { Body, Controller , Post } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertDto } from './dto';

@Controller('convert')
export class ConvertController {

    constructor(private convertService:ConvertService){

    }


    @Post()
     Postconvert(@Body() dto:ConvertDto){
        return this.convertService.Postconvert(dto);
     }
}
