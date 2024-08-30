/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../../modules/users/services/users.service';
import { TokenService } from '../services/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let tokenService: TokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn(),
                        getByEmail: jest.fn(),
                        getById: jest.fn(),
                        updateById: jest.fn(),
                    },
                },
                {
                    provide: TokenService,
                    useValue: {
                        getTokens: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                        verify: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        tokenService = module.get<TokenService>(TokenService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
