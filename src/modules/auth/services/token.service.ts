import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokensResult, TokenPayload } from '../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';
import { JwtEnvironmentVariables } from '@app/common/config/interfaces/config.interface';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    public async getTokens(userId: number): Promise<GetTokensResult> {
        return {
            ...(await this.getAccessToken(userId)),
        };
    }

    public async getAccessToken(userId: number) {
        const { secret, exp } = this.configService.get<JwtEnvironmentVariables>('jwt') as JwtEnvironmentVariables;
        return {
            accessToken: await this.getToken({ userId }, secret, exp),
        };
    }

    public async getToken(data: TokenPayload, secret: string, expiresIn: string): Promise<string> {
        return await this.jwtService.signAsync({ ...data }, { secret, expiresIn });
    }

    public async verify(token: string) {
        return this.jwtService.verify(token);
    }
}
