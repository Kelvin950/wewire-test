import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    // console.log(request.user);
    return request.user;
  },
);
