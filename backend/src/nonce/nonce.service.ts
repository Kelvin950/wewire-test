import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class NonceService {

    constructor(){


    }


    generateNonce(){
        return 1
    }

    generateTimeStamp(){
        return 2
    }

    verifyNonce(){

    }

    verifyTimeStamp(){

    }


    setToCookie(res:Response){

    }

}
