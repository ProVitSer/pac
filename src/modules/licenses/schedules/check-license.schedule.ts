import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LicensesService } from '../services/licenses.service';
import { NotificationsService } from '@app/modules/notifications/services/notifications.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ProductsService } from '@app/modules/products/services/products.service';
import { Licenses } from '../entities/licenses.entity';

@Injectable()
export class CheckLicenseSchedule {
    constructor(
        private readonly licensesService: LicensesService,
        private readonly notificationsService: NotificationsService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly productService: ProductsService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_8AM)
    public async checkLicense() {
        const license = await this.licensesService.getLicenses();

        try {
            const result = await this._checkLicense(license.license);

            if (!result?.active) await this.deactivate(license);

            const productIds = [];

            for (const product of result?.products) {
                const prod = await this.productService.getProductByType(product);
                productIds.push(prod[0].id);
            }

            await this.licensesService.updateLicense({
                license: license.license,
                expirationDate: result.expirationDate,
                isActive: result.isActive,
                productsId: productIds,
                isTest: result.isTest,
                activate: result.activate,
            });
        } catch (e) {
            await this.deactivate(license);
        }
    }

    private async deactivate(license: Licenses) {
        await this.licensesService.deactivateLicense({ license: license.license });
        await this.notificationsService.licenseDeactivateNotification({ client: license.client, license });
    }

    private async _checkLicense(license: string) {
        const response = await firstValueFrom(
            this.httpService
                .get(this.configService.get('licenseServer'), {
                    params: {
                        license,
                    },
                })
                .pipe(
                    catchError((e: AxiosError) => {
                        throw e;
                    }),
                ),
        );

        return response.data;
    }
}
