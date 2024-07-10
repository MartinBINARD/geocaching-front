import api from '../infracstructure/config/axios';
import { ConfirmAccountMapper } from './adapters/real/mappers/ConfirmAccountMapper';
import { ConfirmLoginMapper } from './adapters/real/mappers/ConfirmLoginMapper';
import { RLAuthRepository } from './adapters/real/repositories/RLAuthRepository';
import { CheckAccountUseCase } from './usecases/auth/checkAccountUseCase';
import { LoginUseCase } from './usecases/auth/loginUseCase';

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
  const login = new LoginUseCase(authRepository);

  return {
    checkAccount,
    login,
  };
};

export const core = Core();
