import { AsteriskEventType, AsteriskUnionEventData, ChannelStateDesc, RegisterStatus } from './ami.enum';

export interface BaseEventData {
    event: AsteriskEventType;
    channel: string;
    channelState: string;
    channelStateDesc: ChannelStateDesc;
    callerIDNum: string;
    callerIDName: string;
    connectedLineNum: string;
    connectedLineName: string;
    language: string;
    accountCode: string;
    context: string;
    exten: string;
    priority: string;
    uniqueid: string;
    linkedid: string;
}
export interface RegistryEventData {
    event: AsteriskEventType.Registry;
    channelType: string;
    username: string;
    domain: string;
    status: RegisterStatus;
    cause: string;
}

export interface VarSetEventData {
    event: AsteriskEventType.VarSet;
    variable: string;
    value: string;
}

export interface NewchannelEventData {
    event: AsteriskEventType.Newchannel;
}

export interface HangupEventData {
    event: AsteriskEventType.Hangup;

    cause: string;
    'cause-txt': string;
}

export interface AsteriskAmiEventProviderInterface {
    parseEvent(event: AsteriskUnionEventData): Promise<void>;
}

export type AsteriskAmiEventProviders = {
    [key in AsteriskEventType]?: AsteriskAmiEventProviderInterface;
};

export interface AmiOriginateCallData {
    srcNumber: string;
    dstNumber: string;
    clientTrunkId: string;
}

export interface RegistrationStatusData {
    trunkId: string;
}

export interface SendResiterData extends RegistrationStatusData {}
