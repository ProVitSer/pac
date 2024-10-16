import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { PacPayload } from '../interfaces/pac-connector.interface';
import { PacConnectorJwtEnvironmentVariables } from '@app/common/config/interfaces/config.interface';

@Injectable()
export class PacConnectorTokenService {
    constructor(private configService: ConfigService) {}

    public generateToken(clientId: number): string {
        const { key, issuer, audience } = this.configService.get<PacConnectorJwtEnvironmentVariables>('pacConnectorJwt');

        const payload: PacPayload = {
            clientId,
        };

        const options = {
            expiresIn: '1h',
            issuer: issuer,
            audience: audience,
        };

        return jwt.sign(payload, key, options);
    }
}
