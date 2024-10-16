import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
    @IsString()
    contactId: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    mobile?: string;

    @IsString()
    @IsOptional()
    companyName?: string;

    @IsString()
    @IsOptional()
    crmContactData?: string;

    @IsString()
    @IsOptional()
    tag?: string;

    @IsString()
    @IsOptional()
    mobileTwo?: string;

    @IsString()
    @IsOptional()
    home?: string;

    @IsString()
    @IsOptional()
    homeTwo?: string;

    @IsString()
    @IsOptional()
    business?: string;

    @IsString()
    @IsOptional()
    businessTwo?: string;

    @IsString()
    @IsOptional()
    emailAddress?: string;

    @IsString()
    @IsOptional()
    other?: string;

    @IsString()
    @IsOptional()
    businessFax?: string;

    @IsString()
    @IsOptional()
    homeFax?: string;

    @IsString()
    @IsOptional()
    pager?: string;
}

export default UpdateContactDto;
