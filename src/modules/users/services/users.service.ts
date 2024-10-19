import { Inject, Injectable, LoggerService, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { In, Repository } from 'typeorm';
import { UserNotFoundException } from '../exceptions/user-not-found.exeption';
import UserExistsException from '../exceptions/user-exists.exeption';
import { UserEmailNotFoundException } from '../exceptions/user-email-not-found.exeption';
import ChangeUserPasswordDto from '../dto/change-user-password.dto';
import { ArgonUtilService } from '../../../common/utils/argon.service';
import { UserPasswordNotMatchesException } from '../exceptions/user-password-not-matches.exeption';
import { CreateUserData, ForgotPasswordResponse, UpdateUser, UpdateUserData, UserInfoData } from '../interfaces/users.interface';
import { ClientService } from '../../../modules/client/services/client.service';
import { CreateUserAdapter } from '../adapters/create-user.adapter';
import ResetPassword from '../dto/reset-password.dto';
import ForgotPassword from '../dto/forgot-password.dto';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from '@app/modules/notifications/services/notifications.service';
import { v4 as uuidv4 } from 'uuid';
import { FORGOT_PASSWORD_MESSAGE, RESET_PASSWORD_MESSAGE } from '../users.constants';
import { Products } from '@app/modules/products/entities/products.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly clientService: ClientService,
        private readonly configService: ConfigService,
        private readonly notificationsService: NotificationsService,
    ) {}

    public async create(userData: CreateUserData): Promise<Users> {
        const client = await this.clientService.getClientByClientId(userData.clientId);

        const user = await this.usersRepository.findOne({
            where: {
                email: client.email,
            },
        });

        if (user) {
            throw new UserExistsException(userData.email);
        }

        const newUser = this.usersRepository.create(new CreateUserAdapter(userData, client));

        await this.usersRepository.save(newUser);

        return newUser;
    }

    public async getByEmail(email: string): Promise<Users> {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.client', 'client')
            .leftJoinAndSelect('client.licenses', 'licenses')
            .leftJoinAndSelect('licenses.products', 'products')
            .leftJoinAndSelect('client.voip', 'voip')
            .where('user.email = :email', { email })
            .getOne();

        if (user) {
            return user;
        }
        throw new UserEmailNotFoundException(email);
    }

    public async getByIds(ids: number[]): Promise<Users[]> {
        return this.usersRepository.find({
            where: { id: In(ids) },
        });
    }

    public async getById(id: number): Promise<Users> {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.client', 'client')
            .leftJoinAndSelect('client.licenses', 'licenses')
            .leftJoinAndSelect('licenses.products', 'products')
            .leftJoinAndSelect('client.voip', 'voip')
            .where('user.id = :id', { id })
            .getOne();

        if (user) {
            return user;
        }
        throw new UserNotFoundException(id);
    }

    public async getUserInfo(id: number): Promise<UserInfoData> {
        const user = await this.getById(id);

        if (user) {
            return {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                company: user.client.companyName,
                license: user.client.licenses.license,
                product: user.client.licenses.products.map((p: Products) => p.productType),
                permissions: user.permissions,
                roles: user.roles,
            };
        }
        throw new UserNotFoundException(id);
    }

    public async updateUserById(data: UpdateUserData): Promise<Users> {
        const { id, ...updateData } = data;

        await this.getById(id);

        await this.usersRepository.update({ id }, { ...updateData });

        return await this.getById(id);
    }

    public async updateLatestActivity(id: number): Promise<void> {
        await this.usersRepository.update({ id }, { latestActivity: new Date() });
    }

    public async updateValidationToken(id: number, validationToken: string): Promise<void> {
        await this.usersRepository.update({ id }, { validationToken });
    }

    public async updateUser(data: UpdateUser): Promise<UserInfoData> {
        const { id, ...updateData } = data;

        await this.getById(id);

        await this.usersRepository.update({ id }, { ...updateData });

        return await this.getUserInfo(id);
    }

    public async getUserByValidationToken(validationToken: string): Promise<Users> {
        return await this.usersRepository.findOneBy({ validationToken });
    }

    public async changePassword(data: ChangeUserPasswordDto) {
        const { id, oldPassword, newPassword } = data;

        const user = await this.getById(id);

        const passwordMatches = await ArgonUtilService.verify(user.password, oldPassword);

        if (!passwordMatches) {
            throw new UserPasswordNotMatchesException();
        }

        const hash = await ArgonUtilService.hashData(newPassword);

        await this.usersRepository.update({ id }, { password: hash });
    }

    public async forgotPassword(data: ForgotPassword): Promise<ForgotPasswordResponse> {
        const user = await this.getByEmail(data.email);

        const validationToken = uuidv4();

        await this.updateValidationToken(user.id, validationToken);

        await this.notificationsService.forgotPasswordNotification({
            to: data.email,
            url: `${this.configService.get('domain')}/resetPassword/${validationToken}`,
        });

        return {
            message: FORGOT_PASSWORD_MESSAGE,
        };
    }

    public async resetPassword(data: ResetPassword) {
        const user = await this.getUserByValidationToken(data.verificationCode);

        if (!user) throw new UnauthorizedException();

        const hash = await ArgonUtilService.hashData(data.password);

        await this.updateUser({ id: user.id, password: hash, validationToken: null });

        return {
            message: RESET_PASSWORD_MESSAGE,
        };
    }
}
