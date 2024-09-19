import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiQueueService } from '../services/api-queue.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { ApiAgentsQueue, QueueList } from '../interfaces/api-queue.interface';
import ModifyQueueDto from '../dto/modify-queue.dto';
import { QueueModifyReply } from '@app/modules/pac-connector/modules/pac-queue/interfaces/pac-queue.interface';
import ApiJwtAuthenticationGuard from '@app/modules/auth/guards/api-jwt-authentication.guard';

@UseGuards(RoleGuard([Role.API]))
@UseGuards(ApiJwtAuthenticationGuard)
@Controller('queue')
export class ApiQueueController {
    constructor(private readonly apiQueueService: ApiQueueService) {}

    @Get()
    async getQueueList(@Req() request: RequestWithUser): Promise<QueueList> {
        return await this.apiQueueService.getQueueList(request.user.client);
    }

    @Get('agents/:queueNumber')
    async getQueueAgents(@Req() request: RequestWithUser, @Param('queueNumber') queueNumber: string): Promise<ApiAgentsQueue> {
        return await this.apiQueueService.getQueueAgents(request.user.client, queueNumber);
    }

    @Get('free-agents/:queueNumber')
    async getFreeQueueAgents(@Req() request: RequestWithUser, @Param('queueNumber') queueNumber: string): Promise<ApiAgentsQueue> {
        return await this.apiQueueService.getFreeQueueAgents(request.user.client, queueNumber);
    }

    @Get('busy-agents/:queueNumber')
    async getBusyQueueAgents(@Req() request: RequestWithUser, @Param('queueNumber') queueNumber: string): Promise<ApiAgentsQueue> {
        return await this.apiQueueService.getBusyQueueAgents(request.user.client, queueNumber);
    }

    @Put('agents')
    async addAgentsToQueue(@Req() request: RequestWithUser, @Body() data: ModifyQueueDto): Promise<QueueModifyReply> {
        return await this.apiQueueService.addAgentsToQueue(request.user.client, data);
    }

    @Delete('agents')
    async deleteAgentsFromQueue(@Req() request: RequestWithUser, @Body() data: ModifyQueueDto): Promise<QueueModifyReply> {
        return await this.apiQueueService.deleteAgentsFromQueue(request.user.client, data);
    }
}
