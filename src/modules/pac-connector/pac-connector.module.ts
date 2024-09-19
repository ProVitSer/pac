import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { PacConnectorGrpcServer } from './entities/pac-connector-grpc-server.entity';
import { PacConnectorController } from './controllers/pac-connector.controlles';
import { PacConnectorService } from './services/pac-connector.service';
import { PacConnectorTokenService } from './services/pac-connector-token.service';
import { PacGrpcConnectorService } from './services/pac-grpc-connector.service';
import { RedisModule } from '../redis/redis.module';
import { PacPbxSubscribeEventController } from './modules/pac-pbx-subscribe-event/controllers/pac-pbx-subscribe-event.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PacConnectorGrpcServer]), ClientModule, RedisModule],
    providers: [PacConnectorService, PacConnectorTokenService, PacGrpcConnectorService],
    controllers: [PacConnectorController, PacPbxSubscribeEventController],
    exports: [PacGrpcConnectorService, PacConnectorService],
})
export class PacConnectorModule {}
