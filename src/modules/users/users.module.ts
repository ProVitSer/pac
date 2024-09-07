import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ClientModule } from '../client/client.module';

@Module({
    imports: [TypeOrmModule.forFeature([Users]), ClientModule],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
