import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { VoipService } from '../services/voip.service';
import CreateTrunkDto from '../dto/create-trunk.dto';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { TrunkStatusResult } from '../interfaces/voip.interface';
import { TrunkType } from '../interfaces/voip.enum';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class VoipController {
    constructor(private readonly voipService: VoipService) {}

    @Post()
    async createTrunk(@Req() request: RequestWithUser, @Body() data: CreateTrunkDto): Promise<TrunkStatusResult> {
        return this.voipService.addNewTrunk({ ...data, client: request.user.client });
    }

    // @Get(':trunkType')
    // async getTrunkStatusByType(@Req() request: RequestWithUser, @Query('trunkType') trunkType: TrunkType): Promise<TrunkStatusResult> {
    //     return this.voipService.getTrunkStatusByType(request.user.client, trunkType);
    // }

    @Get('trunk/:trunkId')
    async getTrunkStatusById(@Req() request: RequestWithUser, @Param('trunkId') trunkId: string): Promise<TrunkStatusResult> {
        return this.voipService.getTrunkStatusById(trunkId);
    }

    // @Get(':id')
    // async getById(@Param('id') id: number) {
    //     console.log(id);
    //     return this.productService.getProductById(id);
    // }

    // @Delete(':id')
    // async deleteProduct(@Param('id') id: number) {
    //     return this.productService.deleteProduct(id);
    // }
}
