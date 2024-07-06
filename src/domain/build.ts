import api from '../services/axios';
import { ConfirmAccountMapper } from '../adapters/real/mappers/ConfirmAccountMapper';
import { RLAuthRepository } from '../adapters/real/repositories/RLAuthRepository';
import { CheckAccountUseCase } from './usecases/auth/checkAccountUseCase';

const Core = () => {
  // REPOSITORIES //
  const authRepository = new RLAuthRepository(api, new ConfirmAccountMapper());

  // USECASES //

  // AUTH
  const checkAccount = new CheckAccountUseCase(authRepository);

  return {
    checkAccount,
  };
};

export const core = Core();
