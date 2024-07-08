import { CheckAccountRequest, LoginRequest } from '../../adapters/requests';
import { ConfirmAccount } from '../entities/ConfirmAccount';
import { User } from '../entities/User';

export interface AuthRepository {
  checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount>;
  login(req: LoginRequest): Promise<User>;
}
