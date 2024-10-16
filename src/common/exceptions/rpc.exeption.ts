import { HttpException, HttpStatus } from '@nestjs/common';

export class RpcException extends HttpException {
    constructor(error: any) {
        const nestedErrorMatch = error.details.match(/Status\(StatusCode="([^"]+)", Detail="([^"]+)"\)/);

        const nestedDetail = nestedErrorMatch ? nestedErrorMatch[2] : 'Ошибка взаимодействия с коннектором к PBX';

        super(nestedDetail, HttpStatus.BAD_REQUEST);
    }
}
