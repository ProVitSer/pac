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

    public async getToken(data: TokenPayload): Promise<string> {
        const { secret, exp, algorithm } = this.configService.get<JwtEnvironmentVariables>('jwt') as JwtEnvironmentVariables;

        return await this.jwtService.signAsync({ ...data }, { secret, expiresIn: exp, algorithm });
    }

    public async verify(token: string) {
        return this.jwtService.verify(token);
    }

    public async getAccessToken(userId: number) {
        return {
            accessToken: await this.getToken({ userId }),
        };
    }
}
