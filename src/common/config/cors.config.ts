import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { CorsEnvironmentVariables } from './interfaces/config.interface';

export function loadCorsConfiguration(config: CorsEnvironmentVariables): CorsOptions {
    const cosrOptions: CorsOptions = {
        origin: config.origin,
        allowedHeaders: config.allowedHeaders,
        methods: config.methods,
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: config.credentials,
        maxAge: config.maxAge,
    };
    return cosrOptions;
}
