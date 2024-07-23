import { AxiosInstance } from 'axios';
import { ProfileRespository } from '../../../domain/repositories';
import { GetProfileMapper } from '../mappers';

export class RLProfileRepository implements ProfileRespository {
  constructor(
    private httpClient: AxiosInstance,
    private getProfileMapper: GetProfileMapper
  ) {}

  async getProfile() {
    const result = await this.httpClient.get('profile');

    return this.getProfileMapper.toDomain(result.data);
  }
}
