import api from '../infracstructure/config/axios';
import { ConfirmAccountMapper } from './adapters/real/mappers/ConfirmAccountMapper';
import { ConfirmLoginMapper } from './adapters/real/mappers/ConfirmLoginMapper';
import { confirmRegisterMapper } from './adapters/real/mappers/ConfirmRegisterMapper';
import { RLAuthRepository } from './adapters/real/repositories/RLAuthRepository';
import { RegisterUseCase } from './domain';
import { CheckAccountUseCase } from './usecases/auth/checkAccountUseCase';
import { LoginUseCase } from './usecases/auth/loginUseCase';

const Core = () => {
  // REPOSITORIES //
  const authRepository = new RLAuthRepository(
    api,
    new ConfirmAccountMapper(),
    new ConfirmLoginMapper(),
    new confirmRegisterMapper()
  );

  // USECASES //

  // AUTH
  const register = new RegisterUseCase(authRepository);
  const login = new LoginUseCase(authRepository);
  const checkAccount = new CheckAccountUseCase(authRepository);

  return {
    register,
    login,
    checkAccount,
  };
};

export const core = Core();
