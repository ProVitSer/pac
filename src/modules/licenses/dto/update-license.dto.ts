import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Licenses } from '../entities/licenses.entity';

export class UpdateLicenseDto implements Partial<Licenses> {
    @IsString()
    license: string;

    @IsNumber({}, { each: true })
    @IsOptional()
    productsId?: number[];

    @IsString()
    @IsDate()
    @IsOptional()
    expirationDate?: Date;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsBoolean()
    @IsOptional()
    isTest?: boolean;

    @IsString()
    @IsDate()
    @IsOptional()
    order?: Date;

    @IsString()
    @IsDate()
    @IsOptional()
    activate?: Date;
}

export default UpdateLicenseDto;
