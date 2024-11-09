import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokensResult, TokenPayload } from '../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';
import { ApiEnvironmentVariables, JwtEnvironmentVariables } from '@app/common/config/interfaces/config.interface';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    public async getAccessToken(data: TokenPayload): Promise<GetTokensResult> {
        return {
            ...(await this._getAccessToken(data)),
        };
    }

    public async getToken(data: TokenPayload): Promise<string> {
        const { secret, exp, algorithm } = this.configService.get<JwtEnvironmentVariables>('jwt') as JwtEnvironmentVariables;

        return await this.jwtService.signAsync({ ...data }, { secret, expiresIn: exp, algorithm });
    }

    public async verify(token: string) {
        return this.jwtService.verify(token);
    }

    private async _getAccessToken(data: TokenPayload) {
        return {
            accessToken: await this.getToken(data),
        };
    }

    public async getApiToken(userId: number) {
        const { secret, exp, algorithm } = this.configService.get<JwtEnvironmentVariables>('api') as ApiEnvironmentVariables;

        return {
            token: await this.jwtService.signAsync({ userId }, { secret, expiresIn: exp, algorithm }),
        };
    }
}
