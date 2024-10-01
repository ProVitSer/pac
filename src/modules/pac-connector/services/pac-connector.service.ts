import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacConnectorGrpcServer } from '../entities/pac-connector-grpc-server.entity';
import CreatePacConnectorDto from '../dto/create-pac-connector.dto';
import UpdatePacConnectorDto from '../dto/update-pac-connector.dto';

@Injectable()
export class PacConnectorService {
    constructor(
        @InjectRepository(PacConnectorGrpcServer)
        private pcgsRepository: Repository<PacConnectorGrpcServer>,
    ) {}

    public async addPacConnector(clientId: number, data: CreatePacConnectorDto): Promise<void> {
        const pcgsRepository = await this.pcgsRepository.create({
            ip: data.ip,
            port: data.port,
            clientId,
        });

        await this.pcgsRepository.save(pcgsRepository);
    }

    public async getPacConnector(clientId: number): Promise<PacConnectorGrpcServer> {
        return await this.pcgsRepository.findOne({
            where: { clientId },
        });
    }

    public async deletePacConnector(clientId: number): Promise<void> {
        await this.pcgsRepository.delete({ clientId });
    }

    public async updatePacConnector(clientId: number, pacData: UpdatePacConnectorDto): Promise<PacConnectorGrpcServer> {
        await this.pcgsRepository.update({ clientId }, { ...pacData });

        return await this.getPacConnector(clientId);
    }

    public async getPacConnectorByIp(ip: string): Promise<PacConnectorGrpcServer> {
        return await this.pcgsRepository.findOne({
            where: { ip },
        });
    }
}
