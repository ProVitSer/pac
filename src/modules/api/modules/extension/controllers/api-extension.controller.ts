import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { ApiExtensionService } from '../services/api-extension.service';
import {
    BaseExtensionResult,
    ExtensionInfo,
    ExtensionsList,
    ExtensionStatus,
    RegisteredExtensions,
} from '../interfaces/api-extension.interface';
import { GetExtensionDeviceInfoReply } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.interface';
import CreateExtensionDto from '../dto/create-extension.dto';
import UpdateExtensionDto from '../dto/update-extension.dto';
import ExtensionForwardStatusDto from '../dto/extension-forward-status.dto';
import ExtensionGlobalQueueStatusDto from '../dto/extension-global-queue-status.dto';
import ExtensionQueueStatusDto from '../dto/extension-queue-status.dto';
import ExtensionCallForwardStatusDto from '../dto/extension-call-forward-status.dto';
import ApiJwtAuthenticationGuard from '@app/modules/auth/guards/api-jwt-authentication.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(ProductGuard(ProductType.api))
@UseGuards(ApiJwtAuthenticationGuard)
@Controller('extension')
export class ApiExtensionController {
    constructor(private readonly apiExtensionService: ApiExtensionService) {}

    @Get('info/:extension')
    async getExtensionInfo(@Req() req: RequestWithUser, @Param('extension') extension: string): Promise<ExtensionInfo> {
        return await this.apiExtensionService.getExtensionInfo(req.user.client.clientId, extension);
    }

    @Get('status/:extension')
    async getExtensionStatus(@Req() req: RequestWithUser, @Param('extension') extension: string): Promise<ExtensionStatus> {
        return await this.apiExtensionService.getExtensionStatus(req.user.client.clientId, extension);
    }

    @Get('list')
    async getExtensions(@Req() req: RequestWithUser): Promise<ExtensionsList> {
        return await this.apiExtensionService.getExtensions(req.user.client.clientId);
    }

    @Get('registered')
    async getRegisteredExtensions(@Req() req: RequestWithUser): Promise<RegisteredExtensions> {
        return await this.apiExtensionService.getRegisteredExtensions(req.user.client.clientId);
    }

    @Get('device-info/:extension')
    async getExtensionDeviceInfo(@Req() req: RequestWithUser, @Param('extension') extension: string): Promise<GetExtensionDeviceInfoReply> {
        return await this.apiExtensionService.getExtensionDeviceInfo(req.user.client.clientId, extension);
    }

    @Post()
    async createExtension(@Req() req: RequestWithUser, @Body() extension: CreateExtensionDto): Promise<ExtensionInfo> {
        return await this.apiExtensionService.createExtension(req.user.client.clientId, extension);
    }

    @Delete(':extension')
    async deleteExtension(@Req() req: RequestWithUser, @Param('extension') extension: string): Promise<BaseExtensionResult> {
        return await this.apiExtensionService.deleteExtension(req.user.client.clientId, extension);
    }

    @Put()
    async updateExtensionInfo(@Req() req: RequestWithUser, @Body() extension: UpdateExtensionDto): Promise<ExtensionInfo> {
        return await this.apiExtensionService.updateExtensionInfo(req.user.client.clientId, extension);
    }

    @Post('forward-status')
    async setExtensionForwardStatus(@Req() req: RequestWithUser, @Body() data: ExtensionForwardStatusDto): Promise<ExtensionStatus> {
        return await this.apiExtensionService.setExtensionForwardStatus(req.user.client.clientId, data);
    }

    @Post('global-queue-status')
    async setExtensionGlobalQueuesStatus(
        @Req() req: RequestWithUser,
        @Body() data: ExtensionGlobalQueueStatusDto,
    ): Promise<ExtensionStatus> {
        return await this.apiExtensionService.setExtensionGlobalQueuesStatus(req.user.client.clientId, data);
    }

    @Post('queue-status')
    async setExtensionStatusInQueue(@Req() req: RequestWithUser, @Body() data: ExtensionQueueStatusDto): Promise<ExtensionStatus> {
        return await this.apiExtensionService.setExtensionStatusInQueue(req.user.client.clientId, data);
    }

    @Post('call-forward')
    async setExtensionCallForwardStatus(
        @Req() req: RequestWithUser,
        @Body() data: ExtensionCallForwardStatusDto,
    ): Promise<ExtensionStatus> {
        return await this.apiExtensionService.setExtensionCallForwardStatus(req.user.client.clientId, data);
    }
}
