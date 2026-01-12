export interface RegisterPayload {
  username: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  created_at: Date;
  updated_at: null;
  username: string;
  password: string;
  refreshToken: null;
}
