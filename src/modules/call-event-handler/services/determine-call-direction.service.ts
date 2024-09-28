import { ApiActiveConnectionsInfo } from '@app/modules/api/modules/call/interfaces/api-call.interface';
import { CallDirection } from '../interfaces/call-event-handler.enum';
import { DetermineCallDirectionData } from '../interfaces/call-event-handler.interface';

export class DetermineCallDirectionService {
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

            if (externalParty.length === 3 && internalPartyNumber.length === 3 && destinationNumber.length === 3) {
                callDirection = CallDirection.local;
            } else if (externalParty.length > 3 && internalPartyNumber.length === 3 && destinationNumber.length > 3) {
                callDirection = CallDirection.incoming;
            } else if (externalParty.length > 3 && internalPartyNumber.length > 3 && destinationNumber.length === 3) {
                callDirection = CallDirection.outgoung;
            } else if (externalParty.length > 3 && internalPartyNumber.length > 3 && destinationNumber.length > 3) {
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
