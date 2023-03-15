export interface LoginRequestData {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface MeResponse {
  email: string;
  id: string;
  login: string;
}
