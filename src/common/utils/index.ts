import { NodeEnvType } from '../config/interfaces/config.enum';

export function getEnv(): NodeEnvType {
    return process?.env?.NODE_ENV.trim() as NodeEnvType;
}

export function isDev(): boolean {
    return getEnv() === 'development';
}
