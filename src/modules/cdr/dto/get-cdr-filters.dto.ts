import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class GetCdrFiltersDto {
    @IsOptional()
    @IsDateString()
    calldate?: string;

    @IsOptional()
    @IsString()
    clid?: string;

    @IsOptional()
    @IsString()
    src?: string;

    @IsOptional()
    @IsString()
    dst?: string;

    @IsOptional()
    @IsNumber()
    duration?: number;

    @IsOptional()
    @IsString()
    disposition?: string;

    @IsOptional()
    @IsNumber()
    client_id?: number;

    @IsOptional()
    @IsString()
    call_type?: string;
}
