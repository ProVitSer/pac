import { UsersService } from '../../../modules/users/services/users.service';
import { Injectable } from '@nestjs/common';
import RegisterDto from '../dto/register.dto';
import { ArgonUtilService } from '../../../common/utils/argon.service';
import { PasswordNotMatchesException } from '../exceptions/password-not-matches.exeption';
import LoginDto from '../dto/login.dto';
import { LoginResponse } from '../interfaces/auth.interface';
import { TokenService } from './token.service';
import { Users } from '../../../modules/users/entities/users.entity';
import { LicensesService } from '../../../modules/licenses/services/licenses.service';
import { ClientService } from '../../../modules/client/services/client.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly licensesService: LicensesService,
        private readonly clientService: ClientService,
    ) {}

    public async register(registrationData: RegisterDto): Promise<void> {
        const client = await this.clientService.createClient(registrationData);

        const password = await ArgonUtilService.hashData(registrationData.password);

        await this.licensesService.createLicense({ clientId: client.clientId, productsId: registrationData.productsId });

        await this.usersService.create({
            email: registrationData.userEmail,
            name: registrationData.name,
            phoneNumber: registrationData.userPhoneNumber,
            clientId: client.clientId,
            password: password,
        });
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<Users> {
        const user = await this.usersService.getByEmail(email);
        await this.verifyPassword(plainTextPassword, user.password);
        console.log(user);

        return user;
    }

    public async login(data: LoginDto): Promise<LoginResponse> {
        const user = await this.usersService.getByEmail(data.email);

        await this.verifyPassword(user.password, data.password);

        const tokens = await this.tokenService.getTokens(user.id);

        await this.usersService.updateLatestActivity(user.id);

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
}
