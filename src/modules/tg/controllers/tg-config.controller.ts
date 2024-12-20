import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { TgConfigService } from '../services/tg-config.service';
import { TgConfig } from '../entities/tg-config.entity';
import CreatTgConfig from '../dto/create-tg-config';
import DeleteTgConfig from '../dto/delete-tg-config';
import UpdateTgConfig from '../dto/update-tg-config';
import { Role } from '@app/common/interfaces/enums';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import SendTestMessage from '../dto/send-test-message.dto';
@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(ProductGuard(ProductType.telegram))
@UseGuards(JwtAuthenticationGuard)
@Controller('config')
export class TgConfigController {
    constructor(private readonly tgConfigService: TgConfigService) {}

    @Get()
    async getTgConfigs(@Req() request: RequestWithUser): Promise<TgConfig[]> {
        return this.tgConfigService.getTgConfigs(request.user.client.clientId);
    }

    @Post()
    async createTgConfig(@Req() request: RequestWithUser, @Body() data: CreatTgConfig): Promise<void> {
        return this.tgConfigService.createTgConfig(request.user.client, data);
    }

    @Delete()
    async deleteTgConfig(@Req() request: RequestWithUser, @Body() data: DeleteTgConfig) {
        return this.tgConfigService.deleteTgConfig(request.user.client, data);
    }

    @Put()
    async updateTgConfig(@Req() request: RequestWithUser, @Body() data: UpdateTgConfig): Promise<TgConfig> {
        return this.tgConfigService.updateTgConfig(request.user.client, data);
    }

    @Post('test-send')
    async sendTestMessage(@Body() data: SendTestMessage) {
        return this.tgConfigService.sendTestMessage(data.id);
    }
}
