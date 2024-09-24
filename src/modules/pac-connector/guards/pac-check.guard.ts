import { UtilsService } from '@app/common/utils/utils.service';
import { ClientService } from '@app/modules/client/services/client.service';
import { PacConnectorService } from '@app/modules/pac-connector/services/pac-connector.service';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class PacCheckGuard implements CanActivate {
    constructor(
        private readonly pacConnectorService: PacConnectorService,
        private readonly clientService: ClientService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const ipAddress = request.ip;

        const ip = UtilsService.convertToIPv4(ipAddress);

        const connector = await this.pacConnectorService.getPacConnectorByIp(ip);

        if (!connector) {
            throw new ForbiddenException('Pac not configurated');
        }

        const client = await this.clientService.getClientById(connector.clientId);

        if (!client) {
            throw new ForbiddenException();
        }

        request['connector'] = connector;
        request['client'] = client;

        return true;
    }
}
