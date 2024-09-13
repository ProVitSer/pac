import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { PacConnectorGrpcServer } from './entities/pac-connector-grpc-server.entity';
import { PacSqlModule } from './modules/pac-sql/pac-sql.module';
import { PacConnectorController } from './controllers/pac-connector.controlles';
import { PacConnectorService } from './services/pac-connector.service';
import { PacConnectorTokenService } from './services/pac-connector-token.service';
import { PacGrpcConnectorService } from './services/pac-grpc-connector.service';

@Module({
    imports: [TypeOrmModule.forFeature([PacConnectorGrpcServer]), ClientModule, PacSqlModule],
    providers: [PacConnectorService, PacConnectorTokenService, PacGrpcConnectorService],
    controllers: [PacConnectorController],
    exports: [],
})
export class PacConnectorModule {}
