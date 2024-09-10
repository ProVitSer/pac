import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('statistic')
export class CallQualityAssessmentStatisticController {
    // constructor(private readonly voipService: VoipService) {}
    // @Post('trunk')
    // async createTrunk(@Req() request: RequestWithUser, @Body() data: CreateTrunkDto): Promise<TrunkStatusResult> {
    //     return this.voipService.addNewTrunk({ ...data, client: request.user.client });
    // }
    // @Get('trunk/:trunkId')
    // async getTrunkStatusById(@Req() request: RequestWithUser, @Param('trunkId') trunkId: string): Promise<TrunkStatusResult> {
    //     return this.voipService.getTrunkStatusById(trunkId);
    // }
    // @Get('trunk')
    // async getTrunks(@Req() request: RequestWithUser): Promise<Voip[]> {
    //     return this.voipService.getTrunks(request.user.client);
    // }
    // @Delete('trunk/:trunkId')
    // async deleteTrunk(@Req() request: RequestWithUser, @Param('trunkId') trunkId: string) {
    //     return this.voipService.deleteTrunk(request.user.client, trunkId);
    // }
    // @Put('trunk')
    // async updateTrunk(@Req() request: RequestWithUser, @Body() trunkData: UpdateTrunkDto): Promise<TrunkStatusResult> {
    //     return this.voipService.updateTrunk(request.user.client, trunkData);
    // }
}
