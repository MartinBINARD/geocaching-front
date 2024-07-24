import { User } from '../../../../domain/entities';
import { Mapper } from '../../../../domain/models/Mapper';

export class ConfirmLoginMapper implements Mapper<User> {
  toDomain(raw: any): User {
    const { id, email, pseudo, role, verified } = raw;

    return {
      id,
      email,
      pseudo,
      role,
      verified,
    };
  }
}
