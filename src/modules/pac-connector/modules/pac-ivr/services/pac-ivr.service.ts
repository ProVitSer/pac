import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { IVR_PACKAGE, IVR_PROTO_PATH } from '../pac-ivr.config';
import { IvrServiceMethods, IvrServiceName } from '../interfaces/pac-ivr.enum';
import { IvrListReply } from '../interfaces/pac-ivr.interface';

@Injectable()
export class PacIvrService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async getIvrList(clientId: number): Promise<IvrListReply> {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return await this.grpcSend<{}, IvrListReply>(clientId, new Empty(), IvrServiceMethods.GetIvrList);
    }

    private async grpcSend<T, D>(clientId: number, data: T, methodName: IvrServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            clientId,
            serviceName: IvrServiceName.IvrPbxService,
            methodName,
            data,
            package: IVR_PACKAGE,
            protoPath: IVR_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
