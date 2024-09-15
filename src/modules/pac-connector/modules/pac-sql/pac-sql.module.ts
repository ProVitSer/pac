import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacSqlService } from './services/pac-sql.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacSqlService],
    exports: [PacSqlService],
})
export class PacSqlModule {}
