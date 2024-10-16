import { IsNumber, IsString } from 'class-validator';

export class TransferCallDto {
    @IsNumber()
    callId: number;

    @IsNumber()
    partyConnectionId: number;

    @IsString()
    destinationNumber: string;
}

export default TransferCallDto;
