import { ApiActiveConnectionsInfo } from '@app/modules/api/modules/call/interfaces/api-call.interface';
import { CallDirection } from '../interfaces/call-event-handler.enum';
import { DetermineCallDirectionData } from '../interfaces/call-event-handler.interface';
import configuration from '@app/common/config/config.provider';

export class DetermineCallDirectionService {
    private static readonly pbxExtensionLegth = configuration().pbx.extensionLength;
    public static determine(activeConnectionsInfo: ApiActiveConnectionsInfo[]) {
        const result: DetermineCallDirectionData[] = [];

        activeConnectionsInfo.forEach((call) => {
            const connections = call.connectionsData;

            // Находим запись с наименьшим id
            const minIdConnection = connections.reduce((min, current) => {
                return current.id < min.id ? current : min;
            });

            // Определяем направление вызова
            let callDirection = CallDirection.unknown;
            const { externalParty, internalPartyNumber, destinationNumber } = minIdConnection;

            if (
                externalParty.length === this.pbxExtensionLegth &&
                internalPartyNumber.length === this.pbxExtensionLegth &&
                destinationNumber.length === this.pbxExtensionLegth
            ) {
                callDirection = CallDirection.local;
            } else if (
                externalParty.length > this.pbxExtensionLegth &&
                internalPartyNumber.length === this.pbxExtensionLegth &&
                destinationNumber.length > this.pbxExtensionLegth
            ) {
                callDirection = CallDirection.incoming;
            } else if (
                externalParty.length > this.pbxExtensionLegth &&
                internalPartyNumber.length > this.pbxExtensionLegth &&
                destinationNumber.length === this.pbxExtensionLegth
            ) {
                callDirection = CallDirection.outgoung;
            } else if (
                externalParty.length > this.pbxExtensionLegth &&
                internalPartyNumber.length > this.pbxExtensionLegth &&
                destinationNumber.length > this.pbxExtensionLegth
            ) {
                callDirection = CallDirection.incoming;
            }

            result.push({
                callHistoryId: String(call.callId),
                callDireciton: callDirection,
            });
        });

        return result;
    }
}
