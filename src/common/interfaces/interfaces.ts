import { Users } from '@app/modules/users/entities/users.entity';

export interface Health {
    version: string;
    uptime: string;
    seconds: number;
}

export interface RequestWithUser extends Request {
    user: Users;
}
