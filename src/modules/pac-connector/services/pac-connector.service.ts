import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacConnectorGrpcServer } from '../entities/pac-connector-grpc-server.entity';
import CreatePacConnectorDto from '../dto/create-pac-connector.dto';
import UpdatePacConnectorDto from '../dto/update-pac-connector.dto';
import { PacGrpcConnectorService } from './pac-grpc-connector.service';
import { firstValueFrom } from 'rxjs';
import { SqlServiceMethods, SqlServiceName } from '../modules/pac-sql/interfaces/pac-sql.enum';
import { SQLPACKAGE, SQLPROTO_PATH } from '../modules/pac-sql/pac-sql.config';
import { TEST_CINNECT_SQL } from '@app/common/constants/sql';
import PacInitConnectExeption from '../exceptions/package-not-found.exeption';

@Injectable()
export class PacConnectorService {
    constructor(
        @InjectRepository(PacConnectorGrpcServer)
        private pcgsRepository: Repository<PacConnectorGrpcServer>,
        @Inject(forwardRef(() => PacGrpcConnectorService))
        private readonly pgcs: PacGrpcConnectorService,
    ) {}

    public async addPacConnector(clientId: number, data: CreatePacConnectorDto): Promise<void> {
        const pac = await this.getPacConnector(clientId);

        if (pac) throw new HttpException('Коннектор к АТС уже настроен', 409);

        const pcgsRepository = await this.pcgsRepository.create({
            ip: data.ip,
            port: data.port,
            clientId,
        });

        await this.pcgsRepository.save(pcgsRepository);

        const testConnect = await this.checkPacConnection(clientId);

        if (testConnect) return;

        await this.deletePacConnector(clientId);

        throw new PacInitConnectExeption();
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

    private async checkPacConnection(clientId: number): Promise<boolean> {
        try {
            const pacGrpcConnectorData = {
                clientId,
                serviceName: SqlServiceName.SqlServicePbxService,
                methodName: SqlServiceMethods.ExecuteSql,
                data: { query: TEST_CINNECT_SQL },
                package: SQLPACKAGE,
                protoPath: SQLPROTO_PATH,
            };

            await firstValueFrom(await this.pgcs.callGrpcMethod(pacGrpcConnectorData));

            return true;
        } catch (e) {
            return false;
        }
    }
}
