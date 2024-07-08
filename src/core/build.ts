import api from '../infracstructure/config/axios';
import { ConfirmAccountMapper } from './adapters/real/mappers/ConfirmAccountMapper';
import { ConfirmLoginMapper } from './adapters/real/mappers/ConfirmLoginMapper';
import { RLAuthRepository } from './adapters/real/repositories/RLAuthRepository';
import { CheckAccountUseCase } from './usecases/auth/checkAccountUseCase';

const Core = () => {
  // REPOSITORIES //
  const authRepository = new RLAuthRepository(
    api,
    new ConfirmAccountMapper(),
    new ConfirmLoginMapper()
  );

  // USECASES //

  // AUTH
  const checkAccount = new CheckAccountUseCase(authRepository);

  return {
    checkAccount,
  };
};

export const core = Core();
