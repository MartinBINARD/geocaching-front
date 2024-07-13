export interface UpdatePasswordRequest {
  token: string;
  userId: string;
  password: string;
  confirmation: string;
}
