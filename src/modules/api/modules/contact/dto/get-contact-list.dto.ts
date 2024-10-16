import { IsNumber } from 'class-validator';

export class GetContactListDto {
    @IsNumber()
    pageNumber: number;

    @IsNumber()
    pageSize: number;
}

export default GetContactListDto;
