import { Permission } from '@app/common/interfaces/enums';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthenticationGuard from './jwt-authentication.guard';

const PermissionGuard = (permissions: Permission[]): Type<CanActivate> => {
    class PermissionGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest<RequestWithUser>();

            const user = request.user;

            return user?.permissions.some((permission) => permissions.includes(permission));
        }
    }

    return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
