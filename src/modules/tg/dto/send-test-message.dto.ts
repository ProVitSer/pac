import { IsNumber } from 'class-validator';

export class SendTestMessage {
    @IsNumber()
    id: number;
}

export default SendTestMessage;
