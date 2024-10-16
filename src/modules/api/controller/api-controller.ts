import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { Permission, Role } from '@app/common/interfaces/enums';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { TokenService } from '@app/modules/auth/services/token.service';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import PermissionGuard from '@app/modules/auth/guards/permission.guard';

@Controller()
export class AuthController {
    constructor(private readonly tokenService: TokenService) {}

    @UseGuards(RoleGuard([Role.Admin]))
    @UseGuards(PermissionGuard([Permission.Create]))
    @UseGuards(ProductGuard(ProductType.api))
    @UseGuards(JwtAuthenticationGuard)
    @Get('api-token')
    async getApiToken(@Req() request: RequestWithUser) {
        const { user } = request;

        return await this.tokenService.getApioken(user.id);
    }
}
