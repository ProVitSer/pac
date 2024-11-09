import { BadGatewayException } from '@nestjs/common';

class PacInitConnectExeption extends BadGatewayException {
    constructor() {
        super(`Проблемы с подключением к коннектору к АТС. Возможно некорректно указаны данные для подключения`);
    }
}

export default PacInitConnectExeption;
