import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsConfig } from '../entities/sms-config.entity';
import CreateSmsConfig from '../dto/create-sms-config.dto';
import UpdateSmsConfig from '../dto/update-sms-config.dto';
import SmsConfigNotFoundException from '../exceptions/sms-config-not-found.exception';
import { SmscService } from './smsc.service';

@Injectable()
export class SmsConfigService {
    constructor(
        @InjectRepository(SmsConfig)
        private smsConfigRepository: Repository<SmsConfig>,
        private readonly smscService: SmscService,
    ) {}

    public async addSmsConfig(clientId: number, data: CreateSmsConfig): Promise<void> {
        const smsConfig = await this.smsConfigRepository.findOne({ where: { clientId, deleted: false } });

        if (smsConfig) throw new HttpException('Настройки уже существуют', 400);

        const checkConfigResult = await this.smscService.checkAuthorisation({ login: data.login, psw: data.psw });

        if (!checkConfigResult.result)
            throw new HttpException('Ошибка в логине или пароле, смс сервис не принял авторизационные данные', 400);

        const config = this.smsConfigRepository.create();

        config.clientId = clientId;
        config.login = data.login;
        config.psw = data.psw;
        config.smsText = data.smsText;

        await this.smsConfigRepository.save(config);
    }

    public async getSmsConfig(clientId: number): Promise<SmsConfig> {
        return await this.smsConfigRepository.findOne({ where: { clientId, deleted: false } });

        // if (!smsConfig) throw new SmsConfigNotFoundException(clientId);

        // return smsConfig;
    }

    public async deleteSmsConfig(clientId: number): Promise<void> {
        await this.smsConfigRepository.update({ clientId }, { deleted: true });
    }

    public async updateSmsConfig(clientId: number, updateData: UpdateSmsConfig): Promise<void> {
        const smsConfig = await this.smsConfigRepository.findOne({ where: { clientId, deleted: false } });

        if (!smsConfig) throw new SmsConfigNotFoundException(clientId);

        await this.smsConfigRepository.update({ id: smsConfig.id }, { ...updateData });
    }
}
