import { IsNumber } from 'class-validator';

export class DeleteTgConfig {
    @IsNumber()
    id: number;
}

export default DeleteTgConfig;
