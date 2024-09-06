import { AxiosInstance } from 'axios';
import api from '../infracstructure/config/axios';
import { FetchCircuitQuizFromStore } from './adapters/real/instore/FetchCircuitQuizFromStore';
import {
  ConfirmAccountMapper,
  ConfirmForgotPasswordMapper,
  ConfirmLoginMapper,
  ConfirmLogoutMapper,
  ConfirmRegisterMapper,
  ConfirmUpdatePasswordMapper,
  DeleteProfileMapper,
  FetchCircuitMapper,
  FetchCircuitQuizMapper,
  FilterCircuitsListMapper,
  GetProfileMapper,
  SendUserQuizAnswersMapper,
  UpdateProfileMapper,
} from './adapters/real/mappers';
import { FetchCircuitsListMapper } from './adapters/real/mappers/circuits/FetchCircuitsListMapper';
import { RLAuthRepository } from './adapters/real/repositories/RLAuthRepository';
import { RLCircuitsRepository } from './adapters/real/repositories/RLCircuitsRepository';
import { RLUserRepository } from './adapters/real/repositories/RLUserRepository';
import {
  CheckAccountUseCase,
  DeleteProfileUseCase,
  FetchCircuitQuizUseCase,
  FetchCircuitsListUseCase,
  FetchCircuitUseCase,
  FetchSessionUseCase,
  FilterCircuitsListUseCase,
  ForgotPasswordUseCase,
  GetProfileUseCase,
  LoginUseCase,
  LogoutUseCase,
  RegisterUseCase,
  SendUserQuizAnswersUseCase,
  UpdatePasswordUseCase,
  UpdateProfileUseCase,
} from './usecases';

export interface ConfigurationProps {
  httpClient: AxiosInstance;
  store: [FetchCircuitQuizFromStore];
}
const Core = (configuration: ConfigurationProps) => {
  const { httpClient, store } = configuration;

  // REPOSITORIES //
  const authRepository = new RLAuthRepository(
    httpClient,
    new ConfirmAccountMapper(),
    new ConfirmLoginMapper(),
    new ConfirmLogoutMapper(),
    new ConfirmRegisterMapper(),
    new ConfirmForgotPasswordMapper(),
    new ConfirmUpdatePasswordMapper()
  );

  const circuitsRepository = new RLCircuitsRepository(
    httpClient,
    store,
    new FetchCircuitsListMapper(),
    new FetchCircuitMapper(),
    new FilterCircuitsListMapper(),
    new FetchCircuitQuizMapper(),
    new SendUserQuizAnswersMapper()
  );

  const profileRepository = new RLUserRepository(
    httpClient,
    new GetProfileMapper(),
    new UpdateProfileMapper(),
    new DeleteProfileMapper()
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
  const fetchCircuitQuiz = new FetchCircuitQuizUseCase(circuitsRepository);
  const sendUserQuizAnswers = new SendUserQuizAnswersUseCase(
    circuitsRepository
  );

  // PROFILE
  const getProfile = new GetProfileUseCase(profileRepository);
  const updateProfile = new UpdateProfileUseCase(profileRepository);
  const deleteProfile = new DeleteProfileUseCase(profileRepository);

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
    fetchCircuitQuiz,
    sendUserQuizAnswers,
    getProfile,
    updateProfile,
    deleteProfile,
  };
};

export const core = Core({
  httpClient: api,
  store: [new FetchCircuitQuizFromStore()],
});
