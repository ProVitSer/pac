import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/files.entity';
import { FilesController } from './controllers/files-test.controller';
import { CreateFilesService } from './services/create-files.service';
import { AudioFilesService } from './services/audio-files.service';
import { ClientModule } from '../client/client.module';

@Module({
    imports: [TypeOrmModule.forFeature([Files]), ClientModule],
    providers: [FilesService, AudioFilesService, CreateFilesService],
    exports: [FilesService, AudioFilesService, CreateFilesService],
    controllers: [FilesController],
})
export class FilesModule {}
