import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { Role } from '@app/common/interfaces/enums';

const RoleGuard = (roles: Role[]): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest<RequestWithUser>();

            const user = request.user;

            return user?.roles.some((role) => roles.includes(role));
        }
    }

    return mixin(RoleGuardMixin);
};

export default RoleGuard;
