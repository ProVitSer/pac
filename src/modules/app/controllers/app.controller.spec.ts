import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('AppController', () => {
        it('should return health information"', async () => {
            const result = await appController.getHealth();

            expect(result).toMatchObject({
                version: expect.any(String),
                uptime: expect.any(String),
                seconds: expect.any(Number),
            });
        });
    });
});
