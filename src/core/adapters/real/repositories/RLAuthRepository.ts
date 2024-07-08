import { AxiosInstance } from 'axios';
import { AuthRepository } from '../../../domain/repositories';
import { ConfirmAccount } from '../../../domain/entities/ConfirmAccount';
import { ConfirmAccountMapper } from '../mappers/ConfirmAccountMapper';
import { CheckAccountRequest, LoginRequest } from '../../requests';
import { User } from '../../../domain/entities/User';
import { ConfirmLoginMapper } from '../mappers/ConfirmLoginMapper';

export class RLAuthRepository implements AuthRepository {
  constructor(
    private httpClient: AxiosInstance,
    private confirmAccountMapper: ConfirmAccountMapper,
    private confirmLoginMapper: ConfirmLoginMapper
  ) {}

  async checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount> {
    const result = await this.httpClient.get(`verify?token=${req}`);

    return this.confirmAccountMapper.toDomain(result.data);
  }

  async login(req: LoginRequest): Promise<User> {
    const result = await this.httpClient.post('settings/login', req);

    return this.confirmLoginMapper.toDomain(result.data);
  }
}
