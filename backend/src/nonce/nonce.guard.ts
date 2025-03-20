import { ExecutionContext, Injectable, UnauthorizedException  ,Inject} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NonceService } from "./nonce.service";
import { Request } from "express";

@Injectable() 

export class NonceGuard{

    constructor(private jwt:JwtService, private config:ConfigService  , private nonceService:NonceService){

    }


    async canActivate(context:ExecutionContext){
    
        const request= context.switchToHttp().getRequest<Request>();
        
        if(!request.cookies){
            console.log(`No cookies found`)
            throw new UnauthorizedException('User not logged In nonce ')
        }

        if(!request.cookies.validCred){
            console.log("Ds")
            throw new UnauthorizedException('User not logged In nonce')
        }
        
        const token = request.cookies.validCred;

        console.log(token ,"nonce guard")
        try{

            const nonce = await this.jwt.verifyAsync(token , {secret: this.config.get("JWT_SECRET_NONCE")});
              console.log(nonce)
            const nonceUsed = await this.nonceService.verifyNonce(nonce.nonce)
             console.log(nonceUsed)
            if(nonceUsed){
                console.log("Nonce has already been used")
                throw new UnauthorizedException('User not logge nonced in')
            }
            
        
        }catch(error){
            console.log(error)
            throw new UnauthorizedException('User not logged In nonce')
        }

    return true;
    }
}