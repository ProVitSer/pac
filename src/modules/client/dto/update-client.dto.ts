import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    contact_person_name: string;

    @IsString()
    @IsOptional()
    contact_info: string;
}

export default UpdateCompanyDto;
