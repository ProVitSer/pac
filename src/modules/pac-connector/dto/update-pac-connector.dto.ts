import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePacConnectorDto {
    @IsString()
    @IsOptional()
    ip?: string;

    @IsNumber()
    @IsOptional()
    port?: number;
}

export default UpdatePacConnectorDto;
