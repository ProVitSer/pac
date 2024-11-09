export class AsteriskUtils {
    public static getTrunkId(clientId: number, authId: string): string {
        return `${authId}-${clientId}`;
    }
}
