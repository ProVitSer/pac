import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/auth.interface';
import { ApiEnvironmentVariables } from '@app/common/config/interfaces/config.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiJwtStrategy extends PassportStrategy(Strategy, 'api-jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<ApiEnvironmentVariables>('api').secret,
        });
    }

    async validate(payload: TokenPayload) {
        const { userId } = payload;

        const user = await this.authService.validateUser(userId);

        if (!user) return false;

        if (!user.client.licenses.isActive) return false;

        return user;
    }
}
