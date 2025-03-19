import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


@Injectable() 

export class AuthGuard{

    constructor(private jwt:JwtService, private config:ConfigService){

    }


    async canActivate(context:ExecutionContext){
    
        const request= context.switchToHttp().getRequest();
        if(!request.headers['authorization']) throw new UnauthorizedException('Invalid token')
        const token = request.headers['authorization'].split(" ")[1]; 
        
        try{

            const user = await this.jwt.verifyAsync(token , {secret: this.config.get("JWT_SECRET")});
            request.user = user;
        ;
        }catch(error){
            throw new UnauthorizedException('Invalid token')
        }

    return true;
    }
}