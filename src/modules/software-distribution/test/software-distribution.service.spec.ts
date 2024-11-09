import { Test, TestingModule } from '@nestjs/testing';
import { SoftwareDistributionService } from '../services/software-distribution.service';

describe('SoftwareDistributionService', () => {
    let service: SoftwareDistributionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SoftwareDistributionService],
        }).compile();

        service = module.get<SoftwareDistributionService>(SoftwareDistributionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
