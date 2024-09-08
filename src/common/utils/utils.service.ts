import { Injectable } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class UtilsService {
    static normalizeIp(ip: string): string {
        return ip && ip.indexOf('::ffff:') > -1 ? ip.substring(7) : ip;
    }

    static getClientIp(request: Request): string {
        return this.normalizeIp(requestIp.getClientIp(request));
    }

    static sleep(ms: number): Promise<NodeJS.Timeout> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static generateRandomString(len = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        let str = '';

        for (let i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return str;
    }

    static generateRandomNumber(len = 4): string {
        const numbers = '123456789';

        let str = '';

        for (let i = 0; i < len; i++) {
            str += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        return str;
    }

    static getObservableFn<T>(fn: () => Promise<T>, timeout: number): Observable<T> {
        return new Observable<T>((subscriber) => {
            let timer: NodeJS.Timeout;

            (async function getStatus(fn) {
                fn()
                    .then((status: any) => {
                        timer = setTimeout(() => getStatus(fn), timeout);
                        subscriber.next(status);
                    })
                    .catch((err) => {
                        subscriber.error(err);
                    });
            })(fn);

            return function unsubscribe() {
                clearTimeout(timer);
            };
        });
    }

    static getRandomDelay(delays: number[]): number {
        const randomIndex = Math.floor(Math.random() * delays.length);
        return delays[randomIndex];
    }

    static async randomDelayTimer(delays: number[]): Promise<void> {
        const delay = this.getRandomDelay(delays);
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
}
