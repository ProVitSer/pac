import { SoftwareDownloadType } from '../../modules/software-distribution/interfaces/software-distribution.enum';

export const SOFTWARE_DOWNLOAD_PATH_NAME: { [key in SoftwareDownloadType]: { filePath: string; fileName: string } } = {
    [SoftwareDownloadType.installer]: {
        filePath: 'pac-install',
        fileName: 'pac.exe',
    },
    [SoftwareDownloadType.linux]: {
        filePath: 'pac-api/linux',
        fileName: 'pac.exe',
    },
    [SoftwareDownloadType.windows]: {
        filePath: 'pac-api/windows',
        fileName: 'pac.exe',
    },
};
