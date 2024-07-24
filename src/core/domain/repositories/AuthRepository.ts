import {
  CheckAccountRequest,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  UpdatePasswordRequest,
} from '../../adapters/requests';
import {
  ConfirmRegister,
  ConfirmAccount,
  User,
  ConfirmLogout,
  ConfirmForgotPassword,
  ConfirmUpdatePassword,
} from '../entities';

export interface AuthRepository {
  register(req: RegisterRequest): Promise<ConfirmRegister>;
  login(req: LoginRequest): Promise<User>;
  fetchSession(): Promise<User>;
  logout(): Promise<ConfirmLogout>;
  checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount>;
  forgotPassword(req: ForgotPasswordRequest): Promise<ConfirmForgotPassword>;
  updatePassword(req: UpdatePasswordRequest): Promise<ConfirmUpdatePassword>;
}
