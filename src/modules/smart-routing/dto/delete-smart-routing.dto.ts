import { IsNumber } from 'class-validator';

export class DeleteSmartRouting {
    @IsNumber()
    id: number;
}

export default DeleteSmartRouting;
