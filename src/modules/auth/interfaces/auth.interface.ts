import { Permission, Role } from '@app/common/interfaces/enums';
import { Products } from '@app/modules/products/entities/products.entity';

export interface LoginResponse {
    accessToken: string;
}

export interface TokenPayload {
    userId: number;
    clientId: number;
    permissions: Permission[];
    roles: Role[];
    products: Products[];
}

export interface GetTokensResult {
    accessToken: string;
}

export interface ForgotPasswordResponse {
    message: string;
}
