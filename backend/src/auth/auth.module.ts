import  {Module} from "@nestjs/common" ;
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { AuthGuard } from "./auth.guard";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { NonceModule } from "../nonce/nonce.module";


@Module({
 
    imports:[
       NonceModule
    ] ,
    controllers:[AuthController] ,
    providers:[AuthService] ,
    exports:[]

})

export class  AuthModule{


}  