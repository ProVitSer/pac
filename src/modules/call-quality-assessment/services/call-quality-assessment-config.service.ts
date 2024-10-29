import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AudioFilesData, CreateCqacConfigData, UpdateCqacAudioFiles } from '../interfaces/call-quality-assessment.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { CallQualityAssessmentConfig } from '../entities/call-quality-assessment.-config.entity';
import { ApplicationServiceType } from '@app/common/interfaces/enums';
import { AudioFilesService } from '@app/modules/files/services/audio-files.service';
import { CreateCallQualityAssessmentConfigAdapter } from '../adapters/create-call-quality-assessment-config.adapter';
import { VoipService } from '@app/modules/voip/services/voip.service';
import CqacNotFoundException from '../exceptions/cqac-not-found.exception';
import { FilesService } from '@app/modules/files/services/files.service';
import UpdateCqaConfigkDto from '../dto/update-cqa-trunk.dto';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { CqacTrunkNotFoundException } from '../exceptions/cqac-trunk-not-found';
import { Files } from '@app/modules/files/entities/files.entity';
import { CqaFileType } from '../interfaces/call-quality-assessment.enum';
import { Client } from '@app/modules/client/entities/client.entity';

@Injectable()
export class CallQualityAssessmentConfigService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        @InjectRepository(CallQualityAssessmentConfig)
        private cqac: Repository<CallQualityAssessmentConfig>,
        private readonly voipService: VoipService,
        private readonly audioFilesService: AudioFilesService,
        private readonly filesService: FilesService,
    ) {}

    public async addCqacConfig(data: CreateCqacConfigData): Promise<void> {
        try {
            const { clientId } = data.client;

            const trunkId = data.client.voip[0].trunkId;

            const mainFile = await this.addSoundFile(data.soundMain, clientId);

            const goodByeFile = data.soundGoodbye ? await this.addSoundFile(data.soundGoodbye, clientId) : undefined;

            const cqac = this.cqac.create(
                new CreateCallQualityAssessmentConfigAdapter({ trunkId, mainFile, goodByeFile, client: data.client }),
            );

            await this.cqac.save(cqac);
        } catch (e) {
            this.logger.error(e);

            throw e;
        }
    }

    public async getCqaConfig(clientId: number): Promise<CallQualityAssessmentConfig> {
        const cqac = await this.cqac.findOne({
            where: { clientId },
        });

        if (!cqac) {
            throw new CqacNotFoundException();
        }

        return cqac;
    }

    public async deleteCqacConfig(client: Client): Promise<void> {
        const cqac = await this.getCqaConfig(client.clientId);

        for (const file of cqac.audioFiles) {
            await this.filesService.deleteFile(file.fileId);
        }

        await this.voipService.deleteTrunk(client, cqac.voipTrunkId);

        await this.cqac.delete(cqac.id);
    }

    public async updateTrunkData(client: Client, trunkData: UpdateCqaConfigkDto): Promise<void> {
        const cqac = await this.getCqaConfig(client.clientId);

        const trunkId = client.voip.filter((t: Voip) => (t.applicationServiceType = ApplicationServiceType.cqa));

        if (!trunkId) throw new CqacTrunkNotFoundException();

        const trunk = await this.voipService.updateTrunk(client, { trunkId: trunkId[0].trunkId, ...trunkData });

        await this.cqac.update(cqac.id, { voipTrunkId: trunk.trunkId });
    }

    public async updateCqacAudioFiles(data: UpdateCqacAudioFiles) {
        const cqac = await this.getCqaConfig(data.client.id);

        const originAudioFiles: AudioFilesData[] = [...cqac.audioFiles];

        const updateAudioFiles: AudioFilesData[] = [];

        const soundMain = cqac.audioFiles.find((file) => file.cqaFileType === CqaFileType.cqaMain);

        const soundGoodbye = cqac.audioFiles.find((file) => file.cqaFileType === CqaFileType.cqaGoodbye);

        if (data.soundMain) {
            const file = await this.cqacAudioFileUpdate(data, data.soundMain, soundMain);
            updateAudioFiles.push({ fileId: file.id, cqaFileType: CqaFileType.cqaMain });
        }

        if (data.soundGoodbye) {
            const file = await this.cqacAudioFileUpdate(data, data.soundGoodbye, soundGoodbye);
            updateAudioFiles.push({ fileId: file.id, cqaFileType: CqaFileType.cqaGoodbye });
        }

        this.updateOrAddAudioFiles(originAudioFiles, updateAudioFiles);

        await this.cqac.update(cqac.id, { audioFiles: originAudioFiles });
    }

    private updateOrAddAudioFiles(audioFiles: AudioFilesData[], newAudioFiles: AudioFilesData[]) {
        newAudioFiles.forEach((newFile) => {
            const index = audioFiles.findIndex((file) => file.cqaFileType === newFile.cqaFileType);

            if (index !== -1) {
                audioFiles[index] = newFile;
            } else {
                audioFiles.push(newFile);
            }
        });
    }

    private async cqacAudioFileUpdate(
        data: UpdateCqacAudioFiles,
        soundFile: Express.Multer.File,
        audioFileData?: AudioFilesData,
    ): Promise<Files> {
        if (audioFileData) {
            return await this.updateSoundFile(audioFileData.fileId, soundFile, data.client.clientId);
        } else {
            return await this.addSoundFile(soundFile, data.client.clientId);
        }
    }

    private async updateSoundFile(fileId: number, file: Express.Multer.File, clientId: number): Promise<Files> {
        await this.filesService.deleteFile(fileId);
        return await this.addSoundFile(file, clientId);
    }

    private async addSoundFile(file: Express.Multer.File, clientId: number): Promise<Files> {
        return await this.audioFilesService.saveAudioFile(clientId, file, ApplicationServiceType.cqa);
    }
}
