import {
  CheckAccountRequest,
  LoginRequest,
  RegisterRequest,
} from '../../adapters/requests';
import {
  ConfirmRegister,
  ConfirmAccount,
  User,
  ConfirmLogout,
} from '../entities';

export interface AuthRepository {
  register(req: RegisterRequest): Promise<ConfirmRegister>;
  login(req: LoginRequest): Promise<User>;
  fetchSession(): Promise<User>;
  logout(): Promise<ConfirmLogout>;
  checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount>;
}
