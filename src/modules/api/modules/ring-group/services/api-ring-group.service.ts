import { Client } from '@app/modules/client/entities/client.entity';
import { Injectable } from '@nestjs/common';
import { PacRingGroupService } from '@app/modules/pac-connector/modules/pac-ring-group/services/pac-ring-group.service';
import { RingGroupListReply } from '@app/modules/pac-connector/modules/pac-ring-group/interfaces/pac-ring-group.interface';
import { RingGroupMembers } from '../interfaces/api-ring-group.interface';
import ModifyRingGroupDto from '../dto/modify-ring-group.dto';

@Injectable()
export class ApiRingGroupService {
    constructor(private readonly pacRingGroupService: PacRingGroupService) {}

    public async getRingGroupList(client: Client): Promise<RingGroupListReply> {
        const ringGroupList = await this.pacRingGroupService.getRingGroupList(client);

        if (!ringGroupList?.ringGroups) return { ringGroups: [] };

        return ringGroupList;
    }

    public async getRingGroupMembers(client: Client, ringGroupNumber: string): Promise<RingGroupMembers> {
        const ringMembers = await this.pacRingGroupService.getRingGroupMembers(client, { ringGroupNumber });

        if (!ringMembers) return { members: [] };

        return { members: ringMembers.numbers };
    }

    public async addMemberInRingGroup(client: Client, data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        await this.pacRingGroupService.addMemberInRingGroup(client, { ringGroupNumber: data.ringGroupNumber, numbers: data.numbers });

        return this.getRingGroupMembers(client, data.ringGroupNumber);
    }

    public async deleteMemberInRingGroup(client: Client, data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        await this.pacRingGroupService.deleteMemberInRingGroup(client, { ringGroupNumber: data.ringGroupNumber, numbers: data.numbers });

        return this.getRingGroupMembers(client, data.ringGroupNumber);
    }
}
