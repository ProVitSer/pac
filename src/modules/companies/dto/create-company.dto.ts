import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    contact_person_name: string;

    @IsString()
    @IsNotEmpty()
    contact_info: string;
}

export default CreateCompanyDto;
