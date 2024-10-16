export interface LoginResponse {
    accessToken: string;
}

export interface TokenPayload {
    userId: number;
}

export interface GetTokensResult {
    accessToken: string;
}

export interface ForgotPasswordResponse {
    message: string;
}
