/* eslint-disable @typescript-eslint/ban-types */
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { RingGroupServiceMethods, RingGroupServiceName } from '../interfaces/pac-ring-group.enum';
import { RING_GROUP_PACKAGE, RING_GROUP_PROTO_PATH } from '../pac-ring-group.config';
import {
    AddMemberInRingGroupRequest,
    DeleteMemberInRingGroupRequest,
    GetRingGroupMembersRequest,
    RingGroupListReply,
    RingGroupMembersReply,
} from '../interfaces/pac-ring-group.interface';

@Injectable()
export class PacRingGroupService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async getRingGroupList(clientId: number): Promise<RingGroupListReply> {
        return await this.grpcSend<{}, RingGroupListReply>(clientId, new Empty(), RingGroupServiceMethods.GetRingGroupList);
    }

    public async getRingGroupMembers(clientId: number, data: GetRingGroupMembersRequest): Promise<RingGroupMembersReply> {
        return await this.grpcSend<GetRingGroupMembersRequest, RingGroupMembersReply>(
            clientId,
            data,
            RingGroupServiceMethods.GetRingGroupMembers,
        );
    }

    public async addMemberInRingGroup(clientId: number, data: AddMemberInRingGroupRequest): Promise<RingGroupMembersReply> {
        return await this.grpcSend<AddMemberInRingGroupRequest, RingGroupMembersReply>(
            clientId,
            data,
            RingGroupServiceMethods.AddMemberInRingGroup,
        );
    }

    public async deleteMemberInRingGroup(clientId: number, data: DeleteMemberInRingGroupRequest): Promise<RingGroupMembersReply> {
        return await this.grpcSend<DeleteMemberInRingGroupRequest, RingGroupMembersReply>(
            clientId,
            data,
            RingGroupServiceMethods.DeleteMemberInRingGroup,
        );
    }

    private async grpcSend<T, D>(clientId: number, data: T, methodName: RingGroupServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            clientId,
            serviceName: RingGroupServiceName.RingGroupPbxService,
            methodName,
            data,
            package: RING_GROUP_PACKAGE,
            protoPath: RING_GROUP_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
