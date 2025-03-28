import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Users } from '@app/modules/users/entities/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }
    async validate(email: string, password: string): Promise<Users> {
        const user = await this.authService.getAuthenticatedUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
