import { ConfirmAccount } from '../../../domain/entities/ConfirmAccount';
import { Mapper } from '../../../domain/models/Mapper';

export class ConfirmAccountMapper implements Mapper<ConfirmAccount> {
  toDomain(raw: any): ConfirmAccount {
    return raw;
  }
}
