import api from '../infracstructure/config/axios';
import { RLAuthRepository } from './adapters/real/repositories/RLAuthRepository';
import {
  ConfirmAccountMapper,
  ConfirmLoginMapper,
  ConfirmLogoutMapper,
  ConfirmRegisterMapper,
  ConfirmForgotPasswordMapper,
  ConfirmUpdatePasswordMapper,
  FetchCircuitMapper,
  FilterCircuitsListMapper,
  GetCircuitMapper,
  SendUserQuizAnswersMapper,
  GetProfileMapper,
} from './adapters/real/mappers';
import {
  RegisterUseCase,
  LoginUseCase,
  FetchSessionUseCase,
  CheckAccountUseCase,
  LogoutUseCase,
  ForgotPasswordUseCase,
  UpdatePasswordUseCase,
  FetchCircuitsListUseCase,
  FetchCircuitUseCase,
  FilterCircuitsListUseCase,
  GetCircuitQuizUseCase,
  SendUserQuizAnswersUseCase,
  GetProfileUseCase,
} from './usecases';
import { RLCircuitsRepository } from './adapters/real/repositories/RLCircuitsRepository';
import { FetchCircuitsListMapper } from './adapters/real/mappers/circuits/FetchCircuitsListMapper';
import { RLProfileRepository } from './adapters/real/repositories/RLProfileRepository';

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

  const circuitsRepository = new RLCircuitsRepository(
    api,
    new FetchCircuitsListMapper(),
    new FetchCircuitMapper(),
    new FilterCircuitsListMapper(),
    new GetCircuitMapper(),
    new SendUserQuizAnswersMapper()
  );

  const profileRepository = new RLProfileRepository(
    api,
    new GetProfileMapper()
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

  // CIRCUITS
  const fetchCircuitsList = new FetchCircuitsListUseCase(circuitsRepository);
  const fetchCircuit = new FetchCircuitUseCase(circuitsRepository);
  const filterCircuitsList = new FilterCircuitsListUseCase(circuitsRepository);
  const getCircuitQuiz = new GetCircuitQuizUseCase(circuitsRepository);
  const sendUserQuizAnswers = new SendUserQuizAnswersUseCase(
    circuitsRepository
  );

  // PROFILE
  const getProfile = new GetProfileUseCase(profileRepository);

  return {
    register,
    login,
    fetchSession,
    logout,
    checkAccount,
    forgotPassword,
    updatePassword,
    fetchCircuitsList,
    fetchCircuit,
    filterCircuitsList,
    getCircuitQuiz,
    sendUserQuizAnswers,
    getProfile,
  };
};

export const core = Core();
