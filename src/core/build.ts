import api from '../infracstructure/config/axios';
import { RLAuthRepository } from './adapters/real/repositories/RLAuthRepository';
import {
  ConfirmAccountMapper,
  ConfirmLoginMapper,
  ConfirmLogoutMapper,
  ConfirmRegisterMapper,
  ConfirmForgotPasswordMapper,
  ConfirmUpdatePasswordMapper,
} from './adapters/real/mappers';
import {
  RegisterUseCase,
  LoginUseCase,
  FetchSessionUseCase,
  CheckAccountUseCase,
  LogoutUseCase,
  ForgotPasswordUseCase,
  UpdatePasswordUseCase,
} from './usecases';

const Core = () => {
  // REPOSITORIES //
  const authRepository = new RLAuthRepository(
    api,
    new ConfirmAccountMapper(),
    new ConfirmLoginMapper(),
    new ConfirmLogoutMapper(),
    new ConfirmRegisterMapper(),
    new ConfirmForgotPasswordMapper(),
    new ConfirmUpdatePasswordMapper()
  );

  // USECASES //

  // AUTH
  const register = new RegisterUseCase(authRepository);
  const login = new LoginUseCase(authRepository);
  const fetchSession = new FetchSessionUseCase(authRepository);
  const logout = new LogoutUseCase(authRepository);
  const checkAccount = new CheckAccountUseCase(authRepository);
  const forgotPassword = new ForgotPasswordUseCase(authRepository);
  const updatePassword = new UpdatePasswordUseCase(authRepository);

  return {
    register,
    login,
    fetchSession,
    logout,
    checkAccount,
    forgotPassword,
    updatePassword,
  };
};

export const core = Core();
