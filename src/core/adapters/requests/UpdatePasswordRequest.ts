export interface UpdatePasswordRequest {
  token: string;
  userId: number;
  password: string;
  confirmation: string;
}
