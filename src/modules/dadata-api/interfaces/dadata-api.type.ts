import {
    CleanAddress,
    DaDataBankObj,
    DaDataCompanyObj,
    DaDataFIOObj,
    DaDataFmsUnitObj,
    DaDataGeoObj,
    DaDataMailObj,
    DaDataNameObj,
    DaDataPassportObj,
    DaDataPersonObj,
    DaDataPhoneObj,
} from './dadata-api.interface';

export type DadataAllObj =
    | DaDataGeoObj[]
    | DaDataPersonObj[]
    | DaDataMailObj[]
    | DaDataCompanyObj[]
    | DaDataBankObj[]
    | DaDataFmsUnitObj[]
    | DaDataFIOObj[]
    | DaDataPassportObj[]
    | DaDataNameObj[]
    | DaDataPhoneObj[]
    | CleanAddress[];
