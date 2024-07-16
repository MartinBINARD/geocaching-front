export interface UpdatePasswordRequest {
  token: string;
  user_id: number;
  password: string;
  confirmation: string;
}
