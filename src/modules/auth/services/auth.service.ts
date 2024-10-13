import { UsersService } from '../../../modules/users/services/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import RegisterDto from '../dto/register.dto';
import { ArgonUtilService } from '../../../common/utils/argon.service';
import { PasswordNotMatchesException } from '../exceptions/password-not-matches.exeption';
import LoginDto from '../dto/login.dto';
import { ForgotPasswordResponse, LoginResponse } from '../interfaces/auth.interface';
import { TokenService } from './token.service';
import { Users } from '../../../modules/users/entities/users.entity';
import { LicensesService } from '../../../modules/licenses/services/licenses.service';
import { ClientService } from '../../../modules/client/services/client.service';
import ForgotPassword from '../dto/forgot-password.dto';
import { v4 as uuidv4 } from 'uuid';
import ResetPassword from '../dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from '@app/modules/notifications/services/notifications.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly licensesService: LicensesService,
        private readonly clientService: ClientService,
        private readonly configService: ConfigService,
        private readonly notificationsService: NotificationsService,
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

        return user;
    }

    public async login(data: LoginDto): Promise<LoginResponse> {
        const user = await this.usersService.getByEmail(data.email);

        await this.verifyPassword(data.password, user.password);

        const tokens = await this.tokenService.getTokens(user.id);

        await this.usersService.updateLatestActivity(user.id);

        return tokens;
    }

    public async validateUser(userId: number): Promise<Users> {
        return await this.usersService.getById(userId);
    }

    public async forgotPassword(data: ForgotPassword): Promise<ForgotPasswordResponse> {
        const user = await this.usersService.getByEmail(data.email);

        const validationToken = uuidv4();

        await this.usersService.updateValidationToken(user.id, validationToken);

        await this.notificationsService.forgotPasswordNotification({
            to: data.email,
            url: `${this.configService.get('domain')}/resetPassword/${validationToken}`,
        });

        return {
            message: 'Письмо для сброса пароля успешно отправлено',
        };
    }

    public async resetPassword(data: ResetPassword) {
        const user = await this.usersService.getUserByValidationToken(data.verificationCode);

        if (!user) throw new UnauthorizedException();

        const hash = await ArgonUtilService.hashData(data.password);

        await this.usersService.updateUser({ id: user.id, password: hash, validationToken: null });

        return {
            message: 'Пароль пользователя успешно изменен',
        };
    }

    public async logout(userId: number) {
        await this.usersService.updateLatestActivity(userId);
        return;
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        const passwordMatches = await ArgonUtilService.verify(hashedPassword, plainTextPassword);

        if (!passwordMatches) {
            throw new PasswordNotMatchesException();
        }

        return passwordMatches;
    }
}
