import { NotFoundException } from '@nestjs/common';

class TTSFileNotFoundException extends NotFoundException {
    constructor(ttsId: number, description?: string) {
        const message = description || `Файл с id ${ttsId} отсутствует`;
        super(message);
    }
}

export default TTSFileNotFoundException;
