import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class ModifyRingGroupDto {
    @IsString()
    ringGroupNumber: string;

    @IsArray()
    @ArrayNotEmpty()
    numbers: string[];
}

export default ModifyRingGroupDto;
