import api from '../infracstructure/config/axios';
import { RLAuthRepository } from './adapters/real/repositories/RLAuthRepository';
import {
  ConfirmAccountMapper,
  ConfirmLoginMapper,
  confirmRegisterMapper,
} from './adapters/real/mappers';
import {
  RegisterUseCase,
  LoginUseCase,
  FetchSessionUseCase,
  CheckAccountUseCase,
} from './usecases';

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
  const fetchSession = new FetchSessionUseCase(authRepository);
  const checkAccount = new CheckAccountUseCase(authRepository);

  return {
    register,
    login,
    fetchSession,
    checkAccount,
  };
};

export const core = Core();
