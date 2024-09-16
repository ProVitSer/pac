import { IsString } from 'class-validator';

export class MakeCallDto {
    @IsString()
    from: string;

    @IsString()
    to: string;
}

export default MakeCallDto;
