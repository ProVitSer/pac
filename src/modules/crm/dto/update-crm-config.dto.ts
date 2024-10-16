import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCrmConfig {
    @IsOptional()
    @IsNumber()
    adminId?: number;

    @IsOptional()
    @IsString()
    domain?: string;

    @IsOptional()
    @IsString()
    hash?: string;

    @IsOptional()
    @IsNumber()
    userTaskId?: number;

    @IsOptional()
    @IsNumber()
    taskGroup?: number;

    @IsOptional()
    @IsNumber()
    daedlineMin?: number;
}

export default UpdateCrmConfig;
