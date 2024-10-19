import { Permission, Role } from '@app/common/interfaces/enums';
import { ProductType } from '@app/modules/products/interfaces/products.enum';

export interface UsersInterface {
    id: number;
    email: string;
    phoneNumber?: string;
    firstname: string;
    lastname: string;
    password: string;
    isActive: boolean;
    validationToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDataAdapter {
    email: string;
    phoneNumber?: string;
    firstname: string;
    lastname: string;
    password: string;
    isActive: boolean;
    registeredDate: Date;
}

export interface CreateUserData {
    clientId: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    phoneNumber: string;
}

export interface UpdateUser {
    id: number;
    email?: string;
    phoneNumber?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    isActive?: boolean;
    validationToken?: string;
}

export interface ForgotPasswordResponse {
    message: string;
}

export interface UpdateUserData {
    id: number;
    email?: string;
    phoneNumber: string;
    firstname: string;
    lastname: string;
    permissions: Permission[];
    roles: Role[];
}

export interface UserInfoData {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    company: string;
    license: string;
    product: ProductType[];
    permissions: Permission[];
    roles: Role[];
}
