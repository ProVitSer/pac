import { UsersService } from '../../../modules/users/services/users.service';
import { Injectable } from '@nestjs/common';
import RegisterDto from '../dto/register.dto';
import { ArgonUtilService } from '../../../common/utils/argon.service';
import { PasswordNotMatchesException } from '../exceptions/password-not-matches.exeption';
import LoginDto from '../dto/login.dto';
import { LoginResponse } from '../interfaces/auth.interface';
import { TokenService } from './token.service';
import { Users } from '../../../modules/users/entities/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
    ) {}

    public async register(registrationData: RegisterDto): Promise<Users> {
        const password = await ArgonUtilService.hashData(registrationData.password);

        return this.usersService.create({
            ...registrationData,
            password: password,
        });
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<Users> {
        const user = await this.usersService.getByEmail(email);
        console.log(user);
        await this.verifyPassword(plainTextPassword, user.password);

        return user;
    }

    public async login(data: LoginDto): Promise<LoginResponse> {
        const user = await this.usersService.getByEmail(data.email);

        await this.verifyPassword(user.password, data.password);

        const tokens = await this.tokenService.getTokens(user.id);

        await this.addLastLogin(user.id);

        return tokens;
    }

    public async validateUser(userId: number): Promise<Users> {
        return await this.usersService.getById(userId);
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        const passwordMatches = await ArgonUtilService.verify(hashedPassword, plainTextPassword);

        if (!passwordMatches) {
            throw new PasswordNotMatchesException();
        }

        return passwordMatches;
    }

    private async addLastLogin(id: number): Promise<void> {
        await this.usersService.updateById({ id, latest_activity: new Date() });
    }
}