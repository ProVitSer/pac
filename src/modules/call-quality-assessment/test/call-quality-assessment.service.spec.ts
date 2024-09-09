import { Test, TestingModule } from '@nestjs/testing';
import { CallQualityAssessmentService } from '../services/call-quality-assessment.service';

describe('CallQualityAssessmentService', () => {
    let service: CallQualityAssessmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CallQualityAssessmentService],
        }).compile();

        service = module.get<CallQualityAssessmentService>(CallQualityAssessmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
