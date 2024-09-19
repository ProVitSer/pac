import { CqacAudioFiles, CqacDataAdapter } from '../interfaces/call-quality-assessment.interface';
import { CqaFileType } from '../interfaces/call-quality-assessment.enum';

export class CreateCallQualityAssessmentConfigAdapter {
    audioFiles: CqacAudioFiles[];
    voipTrunkId: string;
    clientId: number;
    constructor(data: CqacDataAdapter) {
        this.audioFiles = this.audioFilesStruct(data);
        this.voipTrunkId = data.trunk.trunkId;
        this.clientId = data.client.id;
    }

    private audioFilesStruct(data: CqacDataAdapter): CqacAudioFiles[] {
        const cqacAudioFiles: CqacAudioFiles[] = [];

        cqacAudioFiles.push({
            fileId: data.mainFile.id,
            cqaFileType: CqaFileType.cqaMain,
        });

        if (data.goodByeFile) {
            cqacAudioFiles.push({
                fileId: data.goodByeFile.id,
                cqaFileType: CqaFileType.cqaGoodbye,
            });
        }

        return cqacAudioFiles;
    }
}
