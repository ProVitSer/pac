import { SttRecognizeStatus } from '../../interfaces/stt.enum';
import { RecognizeTaskStatus } from './interfaces/sber.enum';

export const DEFAULT_SBER_STT_RECOGNIZE_OPTIONS = {
    language: 'ru-RU',
    audio_encoding: 'PCM_S16LE',
    sample_rate: 8000,
};

export const SBER_TTS_STATUS_TO_RECOGNIZE_STATUS: { [status in RecognizeTaskStatus]: SttRecognizeStatus } = {
    [RecognizeTaskStatus.DONE]: SttRecognizeStatus.done,
    [RecognizeTaskStatus.ERROR]: SttRecognizeStatus.error,
    [RecognizeTaskStatus.NEW]: SttRecognizeStatus.inProgress,
    [RecognizeTaskStatus.CANCELED]: SttRecognizeStatus.error,
};
