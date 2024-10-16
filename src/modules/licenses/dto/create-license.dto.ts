import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLicenseDto {
    @IsNumber()
    @IsNotEmpty()
    clientId: number;

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    productsId: number[];
}

export default CreateLicenseDto;
