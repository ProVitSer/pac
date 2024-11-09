export interface RingGroupListReply {
    ringGroups: RingGroupListInfo[];
}

export interface RingGroupListInfo {
    name: string;
    number: string;
}

export interface RingGroupMembersReply {
    numbers: string[];
}

export interface GetRingGroupMembersRequest {
    ringGroupNumber: string;
}

export interface AddMemberInRingGroupRequest {
    ringGroupNumber: string;
    numbers: string[];
}

export interface DeleteMemberInRingGroupRequest {
    ringGroupNumber: string;
    numbers: string[];
}
