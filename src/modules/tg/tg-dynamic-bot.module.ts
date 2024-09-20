import { Module, DynamicModule } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TgBotService } from './services/tg-bot.service';

@Module({})
export class DynamicBotModule {
    static forRoot(token: string): DynamicModule {
        return {
            module: DynamicBotModule,
            imports: [
                TelegrafModule.forRootAsync({
                    useFactory: async () => ({
                        token: token,
                    }),
                }),
            ],
            providers: [TgBotService],
            exports: [TgBotService],
        };
    }
}
