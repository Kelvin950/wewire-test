import  {ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException}  from  '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()

export class AuthService{
     
    constructor(private prisma:PrismaService , private jwt:JwtService , private config:ConfigService){

    }
  async  signin(dto:AuthDto){
      try {
        
        const user =  await this.prisma.user.findFirst({
            where:{
                email:dto.email
            } ,
            select:{
                id:true  , 
                email:true
            }
        })

        if(!user){
            throw new UnauthorizedException('Invalid credentials')
        }
            console.log(this.config.get('JWT_SECRET'));
         const token = await this.jwt.signAsync({id: user.id , email:user.email} , {secret: this.config.get("JWT_SECRET") , expiresIn:"1hr"});
        
        return { user , token};
      } catch (error) {
        
        if(error instanceof PrismaClientKnownRequestError){
             
            throw new  InternalServerErrorException(error.message)
        }

        throw error
      }
       
    }

  
}