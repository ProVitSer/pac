export interface UsersInterface {
    id: number;
    email: string;
    phoneNumber?: string;
    name: string;
    password: string;
    isActive: boolean;
    validationToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDataAdapter {
    email: string;
    phoneNumber?: string;
    name: string;
    password: string;
    isActive: boolean;
    registeredDate: Date;
}

export interface CreateUserData {
    clientId: number;
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
}

export interface UpdateUser {
    id: number;
    email?: string;
    phoneNumber?: string;
    name?: string;
    password?: string;
    isActive?: boolean;
    validationToken?: string;
}
