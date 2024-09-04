import { AsteriskEventType, AsteriskUnionEventData, ChannelStateDesc, RegisterStatus } from './ami.enum';

export interface BaseEventData {
    Event: AsteriskEventType;
}
export interface RegistryEventData {
    Event: AsteriskEventType.Registry;
    ChannelType: string;
    Username: string;
    Domain: string;
    Status: RegisterStatus;
    Cause: string;
}

export interface VarSetEventData {
    Event: AsteriskEventType.VarSet;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: ChannelStateDesc;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    Language: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Variable: string;
    Value: string;
}

export interface NewchannelEventData {
    Event: AsteriskEventType.Newchannel;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: ChannelStateDesc;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    Language: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}

export interface HangupEventData {
    Event: AsteriskEventType.Hangup;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: ChannelStateDesc;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    Language: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Cause: string;
    'Cause-txt': string;
}

export interface AsteriskAmiEventProviderInterface {
    parseEvent(event: AsteriskUnionEventData): Promise<void>;
}

export type AsteriskAmiEventProviders = {
    [key in AsteriskEventType]?: AsteriskAmiEventProviderInterface;
};
