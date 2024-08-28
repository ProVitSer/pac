import { CreateUserData, UserDataAdapter } from '../interfaces/users.interface';

export class UserModelAdapter {
    constructor(public userData: UserDataAdapter) {}

    static async factory(createUser: CreateUserData): Promise<UserModelAdapter> {
        return new UserModelAdapter({
            ...createUser,
            password: createUser.password,
            is_active: true,
            registered_date: new Date(),
        });
    }
}
