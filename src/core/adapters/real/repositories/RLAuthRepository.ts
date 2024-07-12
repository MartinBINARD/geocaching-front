import { AxiosInstance } from 'axios';
import { AuthRepository } from '../../../domain/repositories';
import {
  CheckAccountRequest,
  LoginRequest,
  RegisterRequest,
} from '../../requests';
import {
  ConfirmAccount,
  User,
  ConfirmLogout,
  ConfirmRegister,
} from '../../../domain/entities';
import {
  confirmRegisterMapper,
  ConfirmLoginMapper,
  ConfirmAccountMapper,
  ConfirmLogoutMapper,
} from '../mappers';

export class RLAuthRepository implements AuthRepository {
  constructor(
    private httpClient: AxiosInstance,
    private confirmAccountMapper: ConfirmAccountMapper,
    private confirmLoginMapper: ConfirmLoginMapper,
    private confirmLogoutMapper: ConfirmLogoutMapper,
    private confirmRegisterMapper: confirmRegisterMapper
  ) {}

  async checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount> {
    const result = await this.httpClient.get(`verify?token=${req}`);

    return this.confirmAccountMapper.toDomain(result.data);
  }

  async login(req: LoginRequest): Promise<User> {
    const result = await this.httpClient.post('login', req);

    return this.confirmLoginMapper.toDomain(result.data);
  }

  async fetchSession(): Promise<User> {
    const result = await this.httpClient.get('session');

    return this.confirmLoginMapper.toDomain(result.data);
  }

  async logout(): Promise<ConfirmLogout> {
    const result = await this.httpClient.get('logout');

    return this.confirmLogoutMapper.toDomain(result.data);
  }

  async register(req: RegisterRequest): Promise<ConfirmRegister> {
    const result = await this.httpClient.post('register', req);

    return this.confirmRegisterMapper.toDomain(result.data);
  }
}
