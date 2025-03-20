import  {ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException}  from  '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcryptjs"
import { NonceService } from 'src/nonce/nonce.service';
import { Request, Response } from 'express';
@Injectable()

export class AuthService{
     
    constructor(private prisma:PrismaService , private jwt:JwtService , private config:ConfigService , private nonceService:NonceService){

    }
  async  signin(dto:AuthDto  , res:Response){
      try {
        
        const user =  await this.prisma.user.findFirst({
            where:{
                email:dto.email
            } ,
            select:{
                id:true  , 
                email:true ,
                passwordHash:true
            }
        })

        
   
        console.log(user)
if (!user) {
  throw new UnauthorizedException('Invalid credentials');
}



const isPasswordCorrect = await bcrypt.compare(dto.password, user.passwordHash);

console.log(isPasswordCorrect, dto);

if (!isPasswordCorrect) {
  throw new UnauthorizedException('Invalid credentials');
}
            
         const token = await this.jwt.signAsync({id: user.id , email:user.email} , {secret: this.config.get("JWT_SECRET") , expiresIn:"1hr"});
        
         console.log(token)
        //  const nonce = await  this.nonceService.signNonce()
        //  res.cookie("validCred" , nonce, {httpOnly:true , secure:false , sameSite:"lax", maxAge:5*60*1000})
        const message =  await this.nonceService.setToCookie(res)

        return { user:{email:user.email , id:user.id} , token, ...message};
      } catch (error) {
        
        if(error instanceof PrismaClientKnownRequestError){
             
            throw new  InternalServerErrorException()
        }

        throw error
      }
       
    }

  
}