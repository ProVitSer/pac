import { Client } from '../../../modules/client/entities/client.entity';
import { OriginateCallStatus, TrunkRegistryStatus, TrunkType } from './voip.enum';

export interface VoipInterface {
    id: number;
    client: Client;
    trunk_id: string;
    trunk_type: TrunkType;
    created_at: Date;
    updated_at: Date;
}

export interface CreateTrunkData {
    client: Client;
    trunkType: TrunkType;
    authId: string;
    authPassword: string;
    pbxIp: string;
}
export interface TrunkStatusResult {
    trunkId: string;
    trunkStatus: TrunkRegistryStatus;
}

export interface SendCallData {
    clientId: number;
    trunkId: string;
    dstNumber: string;
    srcNumber: string;
}

export interface SendCallResult {
    uniqCallId: string;
    originateCallStatus: OriginateCallStatus;
}

export interface SendCallWithAudioData extends SendCallData {
    audioPath: string;
}

export interface CreateTrunkResult {
    trinkId: string;
}
export interface VoipPbxService {
    addTrunk(data: CreateTrunkData): Promise<CreateTrunkResult>;
    updateTrunkRegisterStatus(trunkId: string): Promise<void>;
    sendCall(data: SendCallData): Promise<SendCallResult>;
    sendCallWithAudio(data: SendCallWithAudioData): Promise<SendCallResult>;
}

export interface VoipCreateTrunkResult {
    trunkStatus: TrunkRegistryStatus;
}
