import { CheckAccountRequest } from '../../adapters/requests';
import { ConfirmAccount } from '../entities/ConfirmAccount';

export interface AuthRepository {
  checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount>;
}
