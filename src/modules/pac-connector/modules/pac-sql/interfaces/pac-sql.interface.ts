import { Observable } from 'rxjs';

export interface SqlServicePbxService {
    ExecuteSql(data: SqlRequest): Observable<SqlResponse>;
}

export interface SqlRequest {
    query: string;
}

export interface SqlResponse {
    result: string;
    error: string;
}
