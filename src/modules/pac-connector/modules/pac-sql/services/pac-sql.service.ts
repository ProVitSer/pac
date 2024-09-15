import { Client } from '@app/modules/client/entities/client.entity';
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SQLPACKAGE, SQLPROTO_PATH } from '../pac-sql.config';
import { SqlServiceMethods, SqlServiceName } from '../interfaces/pac-sql.enum';
import { SqlRequest, SqlResponse } from '../interfaces/pac-sql.interface';

@Injectable()
export class PacSqlService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async sqlRequest(client: Client, data: SqlRequest) {
        return await this.grpcSend<SqlResponse, SqlRequest>(client, data);
    }

    private async grpcSend<T, D>(client: Client, data: D): Promise<T> {
        const pacGrpcConnectorData: PacGrpcConnectorData<D> = {
            client,
            serviceName: SqlServiceName.SqlServicePbxService,
            methodName: SqlServiceMethods.ExecuteSql,
            data,
            package: SQLPACKAGE,
            protoPath: SQLPROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
