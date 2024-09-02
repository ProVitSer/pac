import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ARI from 'ari-client';
import * as namiLib from 'nami';
import configuration from '@app/common/config/config.provider';
import Ari from 'ari-client';
import { AsteriskAriEnvironmentVariables, AsteriskEnvironmentVariables, ConfigEnvironment } from './interfaces/config.interface';

const asteriskAriFactory = async (ari: AsteriskAriEnvironmentVariables): Promise<{ ariClient: Ari.Client }> => {
    const url = `${ari.host}:${ari.port}`;

    return {
        ariClient: await ARI.connect(url, ari.user, ari.password),
    };
};

const createAsteriskAriProvider = (ari: AsteriskAriEnvironmentVariables): FactoryProvider<{ ariClient: Ari.Client }> => {
    return {
        provide: ari.providerName,
        useFactory: async () => {
            return asteriskAriFactory(ari);
        },
        inject: [ConfigService],
    };
};

export const createAsteriskAri = (): FactoryProvider<{ ariClient: Ari.Client }>[] => {
    const { voip } = configuration() as ConfigEnvironment;

    return voip.asterisk.ari.map((ariApplicationConf: AsteriskAriEnvironmentVariables) => {
        return createAsteriskAriProvider(ariApplicationConf);
    });
};

export const getAsteriskAriProvidesName = () => {
    const { voip } = configuration() as ConfigEnvironment;

    return voip.asterisk.ari.map((ariApplicationConf: AsteriskAriEnvironmentVariables) => {
        return ariApplicationConf.providerName;
    });
};

const asteriskAmiFactory = async (asterisk: AsteriskEnvironmentVariables): Promise<any> => {
    return new namiLib.Nami({
        username: asterisk.ami.username,
        secret: asterisk.ami.secret,
        host: asterisk.ami.host,
        port: asterisk.ami.port,
    });
};

const createAsteriskAmiProvider = (asterisk: AsteriskEnvironmentVariables): FactoryProvider<any> => {
    asteriskAmiFactory(asterisk);
    return {
        provide: asterisk.ami.providerName,
        useFactory: async () => {
            return asteriskAmiFactory(asterisk);
        },

        inject: [ConfigService],
    };
};

export const createAsteriskAmi = (): any => {
    const { voip } = configuration() as ConfigEnvironment;

    return createAsteriskAmiProvider(voip.asterisk);
};

export const getAsteriskAmiProvidesName = (): string => {
    const { voip } = configuration() as ConfigEnvironment;
    return voip.asterisk.ami.providerName;
};
