import { Inject, Injectable, LoggerService } from '@nestjs/common';
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
import { CreateUserData, UpdateUser } from '../interfaces/users.interface';
import { ClientService } from '../../../modules/client/services/client.service';
import UpdateUserDto from '../dto/update-user.dto';
import { CreateUserAdapter } from '../adapters/create-user.adapter';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly clientService: ClientService,
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

    async getByEmail(email: string): Promise<Users> {
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

    async getByIds(ids: number[]): Promise<Users[]> {
        return this.usersRepository.find({
            where: { id: In(ids) },
        });
    }

    async getById(id: number): Promise<Users> {
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

    public async updateById(data: UpdateUserDto): Promise<Users> {
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

    public async updateUser(data: UpdateUser): Promise<Users> {
        const { id, ...updateData } = data;

        await this.getById(id);

        await this.usersRepository.update({ id }, { ...updateData });

        return await this.getById(id);
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
}
