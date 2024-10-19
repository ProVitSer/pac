import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { VoipService } from '../services/voip.service';
import CreateTrunkDto from '../dto/create-trunk.dto';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { TrunkStatusResult } from '../interfaces/voip.interface';
import { Voip } from '../entities/voip.entity';
import UpdateTrunkDto from '../dto/update-trunk.dto';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class VoipController {
    constructor(private readonly voipService: VoipService) {}

    @Post('trunk')
    async createTrunk(@Req() req: RequestWithUser, @Body() data: CreateTrunkDto): Promise<TrunkStatusResult> {
        return this.voipService.addNewTrunk({ ...data, client: req.user.client });
    }

    @Get('trunk/:trunkId')
    async getTrunkStatusById(@Req() req: RequestWithUser, @Param('trunkId') trunkId: string): Promise<TrunkStatusResult> {
        return this.voipService.getTrunkStatusById(trunkId);
    }

    @Get('trunk')
    async getTrunks(@Req() req: RequestWithUser): Promise<Voip[]> {
        return this.voipService.getTrunks(req.user.client);
    }

    @Delete('trunk/:trunkId')
    async deleteTrunk(@Req() req: RequestWithUser, @Param('trunkId') trunkId: string) {
        return this.voipService.deleteTrunk(req.user.client, trunkId);
    }

    @Put('trunk')
    async updateTrunk(@Req() req: RequestWithUser, @Body() trunkData: UpdateTrunkDto): Promise<TrunkStatusResult> {
        return this.voipService.updateTrunk(req.user.client, trunkData);
    }
}
