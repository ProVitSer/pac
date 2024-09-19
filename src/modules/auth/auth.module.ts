import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LicensesModule } from '../licenses/licenses.module';
import { ClientModule } from '../client/client.module';
import { ApiJwtStrategy } from './strategies/api-jwt.strategy';

@Module({
    imports: [PassportModule, UsersModule, JwtModule.register({}), LicensesModule, ClientModule],
    providers: [AuthService, TokenService, LocalStrategy, JwtStrategy, ApiJwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, TokenService],
})
export class AuthModule {}
