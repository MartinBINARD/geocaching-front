import { Profile } from '../entities';

export interface UserRespository {
  getProfile(): Promise<Profile>;
}
