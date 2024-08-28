import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/auth.interface';
import { Users } from '@app/modules/users/entities/users.entity';
import { JwtEnvironmentVariables } from '@app/common/config/interfaces/config.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<JwtEnvironmentVariables>('jwt').secret,
        });
    }

    async validate(payload: TokenPayload): Promise<Users> {
        try {
            return await this.authService.validateUser(payload.userId);
        } catch (e) {
            throw e;
        }
    }
}
