import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacConnectorGrpcServer } from '../entities/pac-connector-grpc-server.entity';
import { Client } from '@app/modules/client/entities/client.entity';
import CreatePacConnectorDto from '../dto/create-pac-connector.dto';
import UpdatePacConnectorDto from '../dto/update-pac-connector.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { PacGrpcConnectorService } from './pac-grpc-connector.service';

interface SqlServicePbxService {
    ExecuteSql(data: { query: string }): Observable<any>;
}

@Injectable()
export class PacConnectorService {
    constructor(
        @InjectRepository(PacConnectorGrpcServer)
        private pcgsRepository: Repository<PacConnectorGrpcServer>,
        private readonly pgcs: PacGrpcConnectorService,
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
        const a = await this.pcgsRepository.findOne({
            where: { clientId: client.id },
        });

        const grpc = await firstValueFrom(
            await this.pgcs.callGrpcMethod<SqlServicePbxService>(a, 'ExecuteSql', {
                query: 'SELECT * FROM cl_participants LIMIT 1;',
            }),
        );
        console.log(grpc);

        // const grpc = await this.pgcs.getGrpcClient(a);

        // const sqlService = grpc.getService<SqlServicePbxService>('SqlServicePbxService');
        // const result = await firstValueFrom(sqlService.ExecuteSql({ query: 'SELECT * FROM cl_participants LIMIT 1;' }));
        // console.log(result);
        return a;
    }

    public async deletePacConnector(client: Client): Promise<void> {
        await this.pcgsRepository.delete({ clientId: client.id });
    }

    public async updatePacConnector(client: Client, pacData: UpdatePacConnectorDto): Promise<PacConnectorGrpcServer> {
        await this.pcgsRepository.update({ clientId: client.id }, { ...pacData });

        return await this.getPacConnector(client);
    }
}
