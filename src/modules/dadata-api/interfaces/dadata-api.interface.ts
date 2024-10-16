import { PlainObject } from '@app/common/interfaces/interfaces';
import { DadataEmailType, DadataBankType, DadataTypes, SuggestionsStatus } from './dadata-api.enum';

export interface DaDataGeoObj {
    kladr_id: string;
    country_iso_code: string;
    postal_code: string;
    selected: string;
    value: string;
    region_type: string | null;
    region: string | null;
    area: string | null;
    area_type: string | null;
    area_with_type: string | null;
    city_type: string | null;
    city_with_type: string | null;
    city: string | null;
    street: string | null;
    house: string | null;
    block_type: string | null;
    block_type_full: string | null;
    block: string | null;
    flat: string | null;
    region_fias_id: string | null;
    city_type_full: string | null;
    city_kladr_id: string | null;
    region_kladr_id: string | null;
    region_with_type: string | null;
    area_kladr_id: string | null;
    street_kladr_id: string | null;
    area_type_full: string | null;
    settlement_type_full: string | null;
    settlement_type: string | null;
    settlement_with_type: string | null;
    settlement_kladr_id: string | null;
    settlement: string | null;
    street_type: string | null;
    street_with_type: string | null;
    street_type_full: string | null;
    fias_id?: string | null;
    region_type_full: string | null;
    house_type: string | null;
    tax_office: string | null;
    tax_office_legal: string | null;
    federal_district: string | null;
    area_fias_id?: string;
    city_district?: string;
    city_district_fias_id?: string;
    city_district_kladr_id?: string;
}

export interface DaDataPersonObj {
    source: string;
    local?: string;
    result?: string;
    result_genitive?: string;
    result_dative?: string;
    result_ablative?: string;
    surname?: string;
    name?: string;
    patronymic?: string;
    email?: string;
    type?: string;
    domain?: string;
    gender?: string;
    qc: number;
}
export interface DaDataMailObj {
    source: string | null;
    type: DadataEmailType | null;
    email?: string;
    local: string;
    domain: string;
    qc: number | null;
    selected?: string;
    value?: string;
}

export interface DaDataCompanyObj {
    kpp: string;
    capital: string | null;
    management: {
        name: string;
        post: string;
        disqualified: string | null;
    };
    founders: string | null;
    managers: string | null;
    predecessors: string | null;
    successors: string | null;
    branch_type: string;
    branch_count: number;
    source: string | null;
    qc: number | null;
    hid: string;
    type: string;
    state: {
        status: string;
        code: string | null;
        actuality_date: string;
        registration_date: string;
        liquidation_date: string | null;
    };
    opf: {
        type: string;
        code: string;
        full: string;
        short: string;
    };
    name: {
        full_with_opf: string;
        short_with_opf: string;
        latin: string | null;
        full: string;
        short: string;
    };
    inn: string | null;
    ogrn: string | null;
    okpo: string | null;
    okato: string | null;
    oktmo: string | null;
    okogu: string | null;
    okfs: string | null;
    okved: string | null;
    address: {
        value: string;
        unrestricted_value: string;
        data: DaDataGeoObj;
    };
    phones: string | null;
    emails: string | null;
    ogrn_date: string;
    okved_type: string;
    employee_count: string | null;
    selected: string;
    value: string;
}

export interface DaDataBankObj {
    opf: {
        type: DadataBankType;
        full: string | null;
        short: string | null;
    };
    name: {
        payment: string | null;
        full: string | null;
        short: string | null;
    };
    bic: string;
    swift: string | null;
    inn: string | null;
    kpp: string | null;
    okpo: string | null;
    correspondent_account: string | null;
    treasury_accounts: string | null;
    registration_number: string | null;
    payment_city: string | null;
    state: {
        status: string;
        code: number | null;
        actuality_date: number | null;
        registration_date: number | null;
        liquidation_date: number | null;
    };
    rkc: string | null;
    cbr: string | null;
    address: {
        value: string | null;
        unrestricted_value: string | null;
        data: DaDataGeoObj;
    };
    phones: string | null;
    selected: string | null;
    value: string | null;
}

export interface DaDataFmsUnitObj {
    code: string;
    name: string;
    region_code: string;
    type: string;
    selected: string;
    value: string;
}

export interface DaDataFIOObj {
    surname: string | null;
    name: string | null;
    patronymic: string | null;
    gender: string | null;
    source: string | null;
    qc: number;
    selected: string | null;
    value: string | null;
}

export interface DaDataPassportObj {
    source: string | null;
    series: string | null;
    number: string | null;
    qc: number;
}

export interface DaDataNameObj {
    source: string | null;
    result: string | null;
    result_genitive: string | null;
    result_dative: string | null;
    result_ablative: string | null;
    surname: string | null;
    name: string | null;
    patronymic: string | null;
    gender: string;
    qc: number;
}

export interface DaDataPhoneObj {
    source: string | null;
    type: string | null;
    phone: string | null;
    country_code: string | null;
    city_code: string | null;
    number: string | null;
    extension: string | null;
    provider: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
    timezone: string | null;
    qc_conflict: number;
    qc: number;
}

export interface CleanAddress {
    source?: string;
    result?: string;
    postal_code?: string;
    country?: string;
    country_iso_code?: string;
    federal_district?: string;
    region_fias_id?: string;
    region_kladr_id?: string;
    region_iso_code?: string;
    region_with_type?: string;
    region_type?: string;
    region_type_full?: string;
    region?: string;
    area_fias_id?: string;
    area_kladr_id?: string;
    area_with_type?: string;
    area_type?: string;
    area_type_full?: string;
    area?: string;
    city_fias_id?: string;
    city_kladr_id?: string;
    city_with_type?: string;
    city_type?: string;
    city_type_full?: string;
    city?: string;
    city_area?: string;
    city_district_fias_id?: string;
    city_district_kladr_id?: string;
    city_district_with_type?: string;
    city_district_type?: string;
    city_district_type_full?: string;
    city_district?: string;
    settlement_fias_id?: string;
    settlement_kladr_id?: string;
    settlement_with_type?: string;
    settlement_type?: string;
    settlement_type_full?: string;
    settlement?: string;
    street_fias_id?: string;
    street_kladr_id?: string;
    street_with_type?: string;
    street_type?: string;
    street_type_full?: string;
    street?: string;
    house_fias_id?: string;
    house_kladr_id?: string;
    house_type?: string;
    house_type_full?: string;
    house?: string;
    block_type?: string;
    block_type_full?: string;
    block?: string;
    entrance?: string;
    floor?: string;
    flat_type?: string;
    flat_type_full?: string;
    flat?: string;
    flat_area?: string;
    square_meter_price?: string;
    flat_price?: string;
    postal_box?: string;
    fias_id?: string;
    fias_code?: string;
    fias_level?: string;
    fias_actuality_state?: string;
    kladr_id?: string;
    capital_marker?: string;
    okato?: string;
    oktmo?: string;
    tax_office?: string;
    tax_office_legal?: string;
    timezone?: string;
    geo_lat?: string;
    geo_lon?: string;
    beltway_hit?: string;
    beltway_distance?: string;
    qc_geo?: number;
    qc_complete?: number;
    qc_house?: number;
    qc?: number;
    unparsed_parts?: string;
    metro?: PlainObject[];
}

export interface DadataRequestQueryParams {
    type: DadataTypes;
    suggestions: SuggestionsStatus;
    query: DadataRequestQuery | string;
    params?: PlainObject;
}

export interface DadataRequestQuery extends PlainObject {
    value?: string;
    lat?: number;
    lon?: number;
}

export interface DadataResponse {
    value: string;
    unrestricted_value: string;
    data: PlainObject;
}
