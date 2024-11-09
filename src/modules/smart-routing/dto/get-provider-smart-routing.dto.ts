import { IsString } from 'class-validator';

export class GetProviderSmartRouting {
    @IsString()
    pbxExtension: string;

    @IsString()
    externalNumber: string;
}

export default GetProviderSmartRouting;
