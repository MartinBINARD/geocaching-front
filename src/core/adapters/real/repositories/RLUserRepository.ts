import { AxiosInstance } from 'axios';
import { UserRespository } from '../../../domain/repositories';
import { GetProfileMapper } from '../mappers';

export class RLUserRepository implements UserRespository {
  constructor(
    private httpClient: AxiosInstance,
    private getProfileMapper: GetProfileMapper
  ) {}

  async getProfile() {
    const result = await this.httpClient.get('profile');

    return this.getProfileMapper.toDomain(result.data);
  }
}
