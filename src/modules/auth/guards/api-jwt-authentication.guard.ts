/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class ApiJwtAuthenticationGuard extends AuthGuard('api-jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: Error, user: any, info: any, context: any) {
        console.log(err);
        if (err || !user) throw new UnauthorizedException();

        return user;
    }
}
