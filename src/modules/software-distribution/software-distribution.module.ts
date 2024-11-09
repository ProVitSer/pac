import { Module } from '@nestjs/common';
import { SoftwareDistributionService } from './services/software-distribution.service';
import { SoftwareDistributionController } from './controllers/software-distribution.controller';

@Module({
    providers: [SoftwareDistributionService],
    controllers: [SoftwareDistributionController],
})
export class SoftwareDistributionModule {}
