import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { UtilsService } from '@app/common/utils/utils.service';
import { Request } from 'express';

const IpGuard = (ips: string[]): Type<CanActivate> => {
    class IpGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest<Request>();

            const ip = UtilsService.getClientIp(request);

            return ips.includes(ip);
        }
    }

    return mixin(IpGuardMixin);
};

export default IpGuard;
