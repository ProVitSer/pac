import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { SttService } from '../services/stt.service';
import RecognizeSpeech from '../dto/recognize-speech.dto';
import { RequestWithUser } from '@app/common/interfaces/interfaces';

@UseGuards(RoleGuard([Role.Admin, Role.User]))
@UseGuards(ProductGuard(ProductType.stt))
@UseGuards(JwtAuthenticationGuard)
@Controller('stt')
export class SttController {
    constructor(private readonly sttService: SttService) {}

    @Get('dialog/:applicationId')
    async getSttDialod(@Param('applicationId') applicationId: string) {
        return await this.sttService.getStt(applicationId);
    }

    @Delete('dialog/:applicationId')
    async deleteSttDialod(@Param('applicationId') applicationId: string) {
        return await this.sttService.deteleStt(applicationId);
    }

    @Post('dialog')
    async recognizeSpeech(@Req() req: RequestWithUser, @Body() data: RecognizeSpeech) {
        return await this.sttService.recognizeSpeech(data);
    }
}
