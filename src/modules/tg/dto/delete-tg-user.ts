import { IsNumber } from 'class-validator';

export class DeleteTgUser {
    @IsNumber()
    id: number;
}

export default DeleteTgUser;
