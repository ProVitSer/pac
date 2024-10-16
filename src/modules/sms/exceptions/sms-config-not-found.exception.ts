import { NotFoundException } from '@nestjs/common';

class SmsConfigNotFoundException extends NotFoundException {
    constructor(client: number) {
        super(`Sms config for client ${client} not found`);
    }
}

export default SmsConfigNotFoundException;
