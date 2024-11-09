import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class ModifyQueueDto {
    @IsString()
    queueNumber: string;

    @IsArray()
    @ArrayNotEmpty()
    agents: string[];
}

export default ModifyQueueDto;
