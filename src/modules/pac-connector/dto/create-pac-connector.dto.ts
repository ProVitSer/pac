import { IsNumber, IsString } from 'class-validator';

export class CreatePacConnectorDto {
    @IsString()
    ip: string;

    @IsNumber()
    port: number;
}

export default CreatePacConnectorDto;
