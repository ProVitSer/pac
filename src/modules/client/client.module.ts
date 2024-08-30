import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [ClientService],
    controllers: [ClientController],
    exports: [ClientService],
})
export class ClientModule {}
