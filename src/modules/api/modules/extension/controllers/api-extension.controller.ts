import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
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

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('extension')
export class ApiExtensionController {
    constructor(private readonly apiExtensionService: ApiExtensionService) {}

    @Get(':extension')
    async getExtensionInfo(@Req() request: RequestWithUser, @Param('extension') extension: string): Promise<ExtensionInfo> {
        return await this.apiExtensionService.getExtensionInfo(request.user.client, extension);
    }

    @Get('status/:extension')
    async getExtensionStatus(@Req() request: RequestWithUser, @Param('extension') extension: string): Promise<ExtensionStatus> {
        return await this.apiExtensionService.getExtensionStatus(request.user.client, extension);
    }

    @Get('list')
    async getExtensions(@Req() request: RequestWithUser): Promise<ExtensionsList> {
        return await this.apiExtensionService.getExtensions(request.user.client);
    }

    @Get('registered')
    async getRegisteredExtensions(@Req() request: RequestWithUser): Promise<RegisteredExtensions> {
        return await this.apiExtensionService.getRegisteredExtensions(request.user.client);
    }

    @Get('device-info/:extension')
    async getExtensionDeviceInfo(
        @Req() request: RequestWithUser,
        @Param('extension') extension: string,
    ): Promise<GetExtensionDeviceInfoReply> {
        return await this.apiExtensionService.getExtensionDeviceInfo(request.user.client, extension);
    }

    @Post()
    async createExtension(@Req() request: RequestWithUser, @Body() extension: CreateExtensionDto): Promise<ExtensionInfo> {
        return await this.apiExtensionService.createExtension(request.user.client, extension);
    }

    @Delete(':extension')
    async deleteExtension(@Req() request: RequestWithUser, @Param('extension') extension: string): Promise<BaseExtensionResult> {
        return await this.apiExtensionService.deleteExtension(request.user.client, extension);
    }

    @Put()
    async updateExtensionInfo(@Req() request: RequestWithUser, @Body() extension: UpdateExtensionDto): Promise<ExtensionInfo> {
        return await this.apiExtensionService.updateExtensionInfo(request.user.client, extension);
    }

    @Post('forward-status')
    async setExtensionForwardStatus(@Req() request: RequestWithUser, @Body() data: ExtensionForwardStatusDto): Promise<ExtensionStatus> {
        return await this.apiExtensionService.setExtensionForwardStatus(request.user.client, data);
    }

    @Post('global-queue-status')
    async setExtensionGlobalQueuesStatus(
        @Req() request: RequestWithUser,
        @Body() data: ExtensionGlobalQueueStatusDto,
    ): Promise<ExtensionStatus> {
        return await this.apiExtensionService.setExtensionGlobalQueuesStatus(request.user.client, data);
    }

    @Post('queue-status')
    async setExtensionStatusInQueue(@Req() request: RequestWithUser, @Body() data: ExtensionQueueStatusDto): Promise<ExtensionStatus> {
        return await this.apiExtensionService.setExtensionStatusInQueue(request.user.client, data);
    }

    //SetExtensionCallForwardStatus
}
