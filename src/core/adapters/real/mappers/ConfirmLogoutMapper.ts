import { ConfirmLogout } from '../../../domain/entities';
import { Mapper } from '../../../domain/models';

export class ConfirmLogoutMapper implements Mapper<ConfirmLogout> {
  toDomain(raw: any): ConfirmLogout {
    const { message } = raw;

    return {
      message,
    };
  }
}
