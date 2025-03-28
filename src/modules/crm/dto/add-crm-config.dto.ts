import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCrmConfig {
    @IsNumber()
    adminId: number;

    @IsString()
    domain: string;

    @IsString()
    hash: string;

    @IsNumber()
    userTaskId: number;

    @IsNumber()
    taskGroup: number;

    @IsOptional()
    @IsNumber()
    deadlineMin?: number;

    @IsString()
    token: string;
}

export default AddCrmConfig;
