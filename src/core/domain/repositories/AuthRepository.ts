import {
  CheckAccountRequest,
  LoginRequest,
  RegisterRequest,
} from '../../adapters/requests';
import { ConfirmRegister, ConfirmAccount, User } from '../entities';

export interface AuthRepository {
  register(req: RegisterRequest): Promise<ConfirmRegister>;
  login(req: LoginRequest): Promise<User>;
  checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount>;
}
