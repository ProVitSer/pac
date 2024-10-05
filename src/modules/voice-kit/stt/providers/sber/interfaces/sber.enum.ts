export enum SberScope {
    personal = 'SALUTE_SPEECH_PERS',
    corp = 'SALUTE_SPEECH_CORP',
    oldCorp = 'SBER_SPEECH',
}

export enum SberSTTApiUrl {
    token = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
    recognize = 'https://smartspeech.sber.ru/rest/v1/speech:recognize',
    uploadVoice = 'https://smartspeech.sber.ru/rest/v1/data:upload',
    setRecognizeTask = 'https://smartspeech.sber.ru/rest/v1/speech:async_recognize',
    getRecognizeTaskStatus = 'https://smartspeech.sber.ru/rest/v1/task:get',
    cancelRecognizeTask = 'https://smartspeech.sber.ru/rest/v1/task:cancel',
    downloadRecognizeRezule = 'https://smartspeech.sber.ru/rest/v1/data:download',
}

export enum RecognizeTaskStatus {
    DONE = 'DONE',
    ERROR = 'ERROR',
    NEW = 'NEW',
    CANCELED = 'CANCELED',
}
