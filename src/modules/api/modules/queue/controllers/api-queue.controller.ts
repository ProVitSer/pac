import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiQueueService } from '../services/api-queue.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { ApiAgentsQueue, QueueList } from '../interfaces/api-queue.interface';
import ModifyQueueDto from '../dto/modify-queue.dto';
import { QueueModifyReply } from '@app/modules/pac-connector/modules/pac-queue/interfaces/pac-queue.interface';
import ApiJwtAuthenticationGuard from '@app/modules/auth/guards/api-jwt-authentication.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(ProductGuard(ProductType.api))
@UseGuards(ApiJwtAuthenticationGuard)
@Controller('queue')
export class ApiQueueController {
    constructor(private readonly apiQueueService: ApiQueueService) {}

    @Get()
    async getQueueList(@Req() req: RequestWithUser): Promise<QueueList> {
        return await this.apiQueueService.getQueueList(req.user.client.clientId);
    }

    @Get('agents/:queueNumber')
    async getQueueAgents(@Req() req: RequestWithUser, @Param('queueNumber') queueNumber: string): Promise<ApiAgentsQueue> {
        return await this.apiQueueService.getQueueAgents(req.user.client.clientId, queueNumber);
    }

    @Get('free-agents/:queueNumber')
    async getFreeQueueAgents(@Req() req: RequestWithUser, @Param('queueNumber') queueNumber: string): Promise<ApiAgentsQueue> {
        return await this.apiQueueService.getFreeQueueAgents(req.user.client.clientId, queueNumber);
    }

    @Get('busy-agents/:queueNumber')
    async getBusyQueueAgents(@Req() req: RequestWithUser, @Param('queueNumber') queueNumber: string): Promise<ApiAgentsQueue> {
        return await this.apiQueueService.getBusyQueueAgents(req.user.client.clientId, queueNumber);
    }

    @Put('agents')
    async addAgentsToQueue(@Req() req: RequestWithUser, @Body() data: ModifyQueueDto): Promise<QueueModifyReply> {
        return await this.apiQueueService.addAgentsToQueue(req.user.client.clientId, data);
    }

    @Delete('agents')
    async deleteAgentsFromQueue(@Req() req: RequestWithUser, @Body() data: ModifyQueueDto): Promise<QueueModifyReply> {
        return await this.apiQueueService.deleteAgentsFromQueue(req.user.client.clientId, data);
    }
}
