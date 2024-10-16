import { Injectable } from '@nestjs/common';
import { PacRingGroupService } from '@app/modules/pac-connector/modules/pac-ring-group/services/pac-ring-group.service';
import { RingGroupListReply } from '@app/modules/pac-connector/modules/pac-ring-group/interfaces/pac-ring-group.interface';
import { RingGroupMembers } from '../interfaces/api-ring-group.interface';
import ModifyRingGroupDto from '../dto/modify-ring-group.dto';

@Injectable()
export class ApiRingGroupService {
    constructor(private readonly pacRingGroupService: PacRingGroupService) {}

    public async getRingGroupList(clientId: number): Promise<RingGroupListReply> {
        const ringGroupList = await this.pacRingGroupService.getRingGroupList(clientId);

        if (!ringGroupList?.ringGroups) return { ringGroups: [] };

        return ringGroupList;
    }

    public async getRingGroupMembers(clientId: number, ringGroupNumber: string): Promise<RingGroupMembers> {
        const ringMembers = await this.pacRingGroupService.getRingGroupMembers(clientId, { ringGroupNumber });

        if (!ringMembers) return { members: [] };

        return { members: ringMembers.numbers };
    }

    public async addMemberInRingGroup(clientId: number, data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        await this.pacRingGroupService.addMemberInRingGroup(clientId, { ringGroupNumber: data.ringGroupNumber, numbers: data.numbers });

        return this.getRingGroupMembers(clientId, data.ringGroupNumber);
    }

    public async deleteMemberInRingGroup(clientId: number, data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        await this.pacRingGroupService.deleteMemberInRingGroup(clientId, { ringGroupNumber: data.ringGroupNumber, numbers: data.numbers });

        return this.getRingGroupMembers(clientId, data.ringGroupNumber);
    }
}
