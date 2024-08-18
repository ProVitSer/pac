import { ConfigService } from '@nestjs/config';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';
import * as path from 'path';
import { AppProtocol } from './interfaces/config.enum';

export default (config: ConfigService): HttpsOptions => {
    return (config.get('appProtocol') as AppProtocol) === AppProtocol.https
        ? {
              key: readFileSync(path.join(config.get('certsPathFile.key'))),
              cert: readFileSync(path.join(config.get('certsPathFile.cert'))),
              ca: readFileSync(path.join(config.get('certsPathFile.ca'))),
          }
        : undefined;
};
