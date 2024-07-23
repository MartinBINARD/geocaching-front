import { Profile } from '../entities';

export interface ProfileRespository {
  getProfile(): Promise<Profile>;
}
