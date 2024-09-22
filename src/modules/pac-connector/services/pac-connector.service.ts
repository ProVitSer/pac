import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacConnectorGrpcServer } from '../entities/pac-connector-grpc-server.entity';
import { Client } from '@app/modules/client/entities/client.entity';
import CreatePacConnectorDto from '../dto/create-pac-connector.dto';
import UpdatePacConnectorDto from '../dto/update-pac-connector.dto';

@Injectable()
export class PacConnectorService {
    constructor(
        @InjectRepository(PacConnectorGrpcServer)
        private pcgsRepository: Repository<PacConnectorGrpcServer>,
    ) {}

    public async addPacConnector(client: Client, data: CreatePacConnectorDto): Promise<void> {
        const pcgsRepository = await this.pcgsRepository.create({
            ip: data.ip,
            port: data.port,
            clientId: client.id,
        });

        await this.pcgsRepository.save(pcgsRepository);
    }

    public async getPacConnector(client: Client): Promise<PacConnectorGrpcServer> {
        return await this.pcgsRepository.findOne({
            where: { clientId: client.id },
        });
    }

    public async deletePacConnector(client: Client): Promise<void> {
        await this.pcgsRepository.delete({ clientId: client.id });
    }

    public async updatePacConnector(client: Client, pacData: UpdatePacConnectorDto): Promise<PacConnectorGrpcServer> {
        await this.pcgsRepository.update({ clientId: client.id }, { ...pacData });

        return await this.getPacConnector(client);
    }

    public async getPacConnectorByIp(ip: string): Promise<PacConnectorGrpcServer> {
        return await this.pcgsRepository.findOne({
            where: { ip },
        });
    }
}
