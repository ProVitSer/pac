import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { Role } from '@app/common/interfaces/enums';

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;

            return user?.roles.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
};

export default RoleGuard;
