import { Client } from '@app/modules/client/entities/client.entity';
import { OriginateCallStatus, TrunkStatus, TrunkType } from './voip.enum';

export interface VoipInterface {
    id: number;
    client: Client;
    trunk_id: string;
    trunk_type: TrunkType;
    created_at: Date;
    updated_at: Date;
}

export interface AddTrunkData {
    clientId: number;
    trunkType: TrunkType;
    authId: string;
    password: string;
    pbxIp: string;
}

export interface AddTrunkResult {
    trunkId: string;
}

export interface TrunkStatusResult {
    trunkId: string;
    trunkStatus: TrunkStatus;
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
export interface VoipPbxService {
    addTrunk(data: AddTrunkData): Promise<AddTrunkResult>;
    getTrunkStatus(trunkId: string): Promise<TrunkStatusResult>;
    sendCall(data: SendCallData): Promise<SendCallResult>;
    sendCallWithAudio(data: SendCallWithAudioData): Promise<SendCallResult>;
}
