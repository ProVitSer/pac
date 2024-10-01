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

    public async sqlRequest(clientId: number, data: SqlRequest) {
        return await this.grpcSend<SqlRequest, SqlResponse>(clientId, data);
    }

    private async grpcSend<T, D>(clientId: number, data: T): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            clientId,
            serviceName: SqlServiceName.SqlServicePbxService,
            methodName: SqlServiceMethods.ExecuteSql,
            data,
            package: SQLPACKAGE,
            protoPath: SQLPROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
