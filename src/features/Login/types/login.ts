export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginResponse {
  message: string;
  data: DataResponse;
}

export interface DataResponse {
  username: string;
  access_token: string;
  refresh_token: string;
}

