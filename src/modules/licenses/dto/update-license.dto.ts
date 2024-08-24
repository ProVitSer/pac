import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Licenses } from '../entities/licenses.entity';

export class UpdateLicenseDto implements Partial<Licenses> {
    @IsNumber({}, { each: true })
    @IsOptional()
    products_id?: number[];

    @IsString()
    @IsDate()
    @IsOptional()
    expiration_date?: Date;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @IsBoolean()
    @IsOptional()
    is_test?: boolean;

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
