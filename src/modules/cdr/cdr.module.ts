import { Module } from '@nestjs/common';
import { CdrService } from './services/cdr.service';
import { CdrController } from './controllers/cdr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cdr } from './entities/cdr.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cdr])],
    providers: [CdrService],
    controllers: [CdrController],
    exports: [CdrService],
})
export class CdrModule {}
