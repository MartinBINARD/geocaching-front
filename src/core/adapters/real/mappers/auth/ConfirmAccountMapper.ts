import { ConfirmAccount } from '../../../../domain/entities';
import { Mapper } from '../../../../domain/models/Mapper';

export class ConfirmAccountMapper implements Mapper<ConfirmAccount> {
  toDomain(raw: any): ConfirmAccount {
    return raw;
  }
}
