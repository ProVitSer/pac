import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { In, Repository } from 'typeorm';
import { UserModelAdapter } from '../adapters/user-model.adapter';
import { UserNotFoundException } from '../exceptions/user-not-found.exeption';
import UserExistsException from '../exceptions/user-exists.exeption';
import { UserEmailNotFoundException } from '../exceptions/user-email-not-found.exeption';
import ChangeUserPasswordDto from '../dto/change-user-password.dto';
import { ArgonUtilService } from '../../../common/utils/argon.service';
import { UserPasswordNotMatchesException } from '../exceptions/user-password-not-matches.exeption';
import { CreateUserData } from '../interfaces/users.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async create(userData: CreateUserData): Promise<Users> {
        const license = await this.usersRepository.findOne({
            where: {
                email: userData.email,
            },
        });

        if (license) {
            throw new UserExistsException(userData.email);
        }

        const user = await UserModelAdapter.factory(userData);

        const newUser = await this.usersRepository.create({
            ...user.userData,
        });

        await this.usersRepository.save(newUser);

        return newUser;
    }

    async getByEmail(email: string): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ email });
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
        const user = await this.usersRepository.findOneBy({ id });
        if (user) {
            return user;
        }
        throw new UserNotFoundException(id);
    }

    public async updateById(data: Partial<Users>): Promise<Users> {
        const { id, ...updateData } = data;

        await this.getById(id);

        await this.usersRepository.update({ id }, { ...updateData });

        return await this.getById(id);
    }

    public async changePassword(data: ChangeUserPasswordDto) {
        const { id, old_password, new_password } = data;

        const user = await this.getById(id);

        const passwordMatches = await ArgonUtilService.verify(user.password, old_password);

        if (!passwordMatches) {
            throw new UserPasswordNotMatchesException();
        }

        const hash = await ArgonUtilService.hashData(new_password);

        await this.usersRepository.update({ id }, { password: hash });
    }
}
