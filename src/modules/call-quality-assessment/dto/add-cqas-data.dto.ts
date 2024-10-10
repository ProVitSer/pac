import { IsNumber, IsString } from 'class-validator';

export class AddCqasData {
    @IsNumber()
    clientId: number;

    @IsString()
    number: string;

    @IsString()
    exten: string;

    @IsString()
    uniqueid: string;

    @IsString()
    rating: string;
}

export default AddCqasData;
