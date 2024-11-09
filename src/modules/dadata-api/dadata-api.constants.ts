import { SuggestionsStatus, DadataTypes } from './interfaces/dadata-api.enum';

export enum ApiURL {
    suggestions = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/',
    cleaner = 'https://cleaner.dadata.ru/api/v1/clean/',
    geolocate = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/',
}

export const DADATA_API_MAP: { [hintStatus in SuggestionsStatus]: { [status in DadataTypes]?: ApiURL } } = {
    [SuggestionsStatus.YES]: {
        [DadataTypes.ADDRESS]: ApiURL.suggestions,
        [DadataTypes.COMPANY]: ApiURL.suggestions,
        [DadataTypes.BANK]: ApiURL.suggestions,
        [DadataTypes.EMAIL]: ApiURL.suggestions,
        [DadataTypes.FMSUNIT]: ApiURL.suggestions,
        [DadataTypes.FIO]: ApiURL.suggestions,
        //[DadataTypes.GEOLOCATEADDRESS] : ApiURL.geolocate
    },
    [SuggestionsStatus.NO]: {
        [DadataTypes.ADDRESS]: ApiURL.cleaner,
        [DadataTypes.EMAIL]: ApiURL.cleaner,
        [DadataTypes.PASSPORT]: ApiURL.cleaner,
        [DadataTypes.NAME]: ApiURL.cleaner,
        [DadataTypes.PHONE]: ApiURL.cleaner,
    },
};
