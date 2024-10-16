import { Users } from '@app/modules/users/entities/users.entity';
import { Request } from 'express';

export interface Health {
    version: string;
    uptime: string;
    seconds: number;
}

export interface RequestWithUser extends Request {
    user: Users;
}

export interface PlainObject {
    [key: string]: any;
}
