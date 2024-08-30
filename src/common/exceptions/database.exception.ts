import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(error: string | object) {
        const body = HttpException.createBody('', 'Database error', HttpStatus.BAD_REQUEST);
        super(body, HttpStatus.BAD_REQUEST);
    }
}
