import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { PacConnectorService } from '../services/pac-connector.service';
import CreatePacConnectorDto from '../dto/create-pac-connector.dto';
import { PacConnectorGrpcServer } from '../entities/pac-connector-grpc-server.entity';
import UpdatePacConnectorDto from '../dto/update-pac-connector.dto';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(ProductGuard(ProductType.api))
@UseGuards(JwtAuthenticationGuard)
@Controller('pac-connector')
export class PacConnectorController {
    constructor(private readonly pacConnectorService: PacConnectorService) {}

    @Post()
    async addPacConnector(@Req() request: RequestWithUser, @Body() data: CreatePacConnectorDto): Promise<void> {
        return this.pacConnectorService.addPacConnector(request.user.client.clientId, data);
    }

    @Get()
    async getPacConnector(@Req() request: RequestWithUser): Promise<PacConnectorGrpcServer> {
        return this.pacConnectorService.getPacConnector(request.user.client.clientId);
    }

    @Delete()
    async deletePacConnector(@Req() request: RequestWithUser): Promise<void> {
        return this.pacConnectorService.deletePacConnector(request.user.client.clientId);
    }

    @Put()
    async updatePacConnector(@Req() request: RequestWithUser, @Body() pacData: UpdatePacConnectorDto): Promise<PacConnectorGrpcServer> {
        return this.pacConnectorService.updatePacConnector(request.user.client.clientId, pacData);
    }
}
