import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/files.entity';
import { FilesController } from './controllers/files-test.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Files])],
    providers: [FilesService],
    exports: [FilesService],
    controllers: [FilesController],
})
export class FilesModule {}
