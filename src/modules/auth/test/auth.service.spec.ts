/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../../modules/users/services/users.service';
import { TokenService } from '../services/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LicensesService } from '../../../modules/licenses/services/licenses.service';
import { ClientService } from '../../../modules/client/services/client.service';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let tokenService: TokenService;
    let licensesService: LicensesService;
    let clientService: ClientService;

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

                {
                    provide: LicensesService,
                    useValue: {
                        createLicense: jest.fn(),
                    },
                },

                {
                    provide: ClientService,
                    useValue: {
                        createClient: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        tokenService = module.get<TokenService>(TokenService);
        licensesService = module.get<LicensesService>(LicensesService);
        clientService = module.get<ClientService>(ClientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
