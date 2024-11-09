import { Module } from '@nestjs/common';
import { MissedCallController } from './controllers/missed-call.controller';
import { MissedCallService } from './services/missed-call.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissedCall } from './entities/missed-call.entity';
import { PacSqlModule } from '../pac-connector/modules/pac-sql/pac-sql.module';
import { MissedCallListenters } from './listenters/missed-call.listenters';
import { AmqpModule } from '../amqp/amqp.module';

@Module({
    imports: [TypeOrmModule.forFeature([MissedCall]), PacSqlModule, AmqpModule],
    controllers: [MissedCallController],
    providers: [MissedCallService, MissedCallListenters],
})
export class MissedCallModule {}
