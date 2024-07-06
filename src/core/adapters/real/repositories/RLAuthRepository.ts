import { AxiosInstance } from 'axios';
import { AuthRepository } from '../../../domain/repositories';
import { ConfirmAccount } from '../../../domain/entities/ConfirmAccount';
import { ConfirmAccountMapper } from '../mappers/ConfirmAccountMapper';
import { CheckAccountRequest } from '../../requests';

export class RLAuthRepository implements AuthRepository {
  constructor(
    private httpClient: AxiosInstance,
    private confirmAccountMapper: ConfirmAccountMapper
  ) {}

  async checkAccount(req: CheckAccountRequest): Promise<ConfirmAccount> {
    const result = await this.httpClient.get(`verify?token=${req}`);

    return this.confirmAccountMapper.toDomain(result.data);
  }
}
