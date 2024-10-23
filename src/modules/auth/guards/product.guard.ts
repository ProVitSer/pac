import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';

const ProductGuard = (product: ProductType): Type<CanActivate> => {
    class ProductGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest<RequestWithUser>();

            const user = request.user;

            return user.client.licenses.products.some((prod) => prod.productType == product);
        }
    }

    return mixin(ProductGuardMixin);
};

export default ProductGuard;
