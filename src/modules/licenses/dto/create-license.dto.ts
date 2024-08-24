import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLicenseDto {
    @IsNumber()
    @IsNotEmpty()
    client_id: number;

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    products_id: number[];
}

export default CreateLicenseDto;
