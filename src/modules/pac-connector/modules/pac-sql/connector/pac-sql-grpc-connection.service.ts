// import { PacConnectorGrpcServer } from '@app/modules/pac-connector/entities/pac-connector-grpc-server.entity';
// import { Metadata } from '@grpc/grpc-js';
// import { Injectable } from '@nestjs/common';
// import { ClientGrpc, ClientProxyFactory, Transport } from '@nestjs/microservices';
// import { join } from 'path';

// @Injectable()
// export class PacSqlGrpcConnectionService {
//     private activeConnections: Map<number, ClientGrpc> = new Map();

//     constructor() {}

//     async getGrpcClient(pcgs: PacConnectorGrpcServer): Promise<ClientGrpc> {
//         if (this.activeConnections.has(pcgs.clientId)) {
//             return this.activeConnections.get(pcgs.clientId);
//         }

//         const client = ClientProxyFactory.create({
//             transport: Transport.GRPC,
//             options: {
//                 package: 'sql',
//                 protoPath: join(__dirname, '../proto/sql.proto'),
//                 url: `${pcgs.ip}:${pcgs.port}`,
//             },
//         }) as ClientGrpc;

//         this.activeConnections.set(pcgs.clientId, client);

//         return client;
//     }

//     public closeConnection(clientId: number) {
//         if (this.activeConnections.has(clientId)) {
//             this.activeConnections.delete(clientId);
//         }
//     }

//     private callGrpcTokenMetadata(): Metadata {
//         const metadata = new Metadata();
//         metadata.add('Authorization', `Bearer ${token}`);

//         return metadata;
//     }
// }
