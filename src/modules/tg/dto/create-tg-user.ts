import { IsString } from 'class-validator';

export class CreatTgUser {
    @IsString()
    name: string;

    @IsString()
    userName: string;

    @IsString()
    extension: string;
}

export default CreatTgUser;
