import { ConfirmDeleteProfile } from '../../../../domain/entities/ConfirmDeleteProfile';
import { Mapper } from '../../../../domain/models';

export class DeleteProfileMapper implements Mapper<ConfirmDeleteProfile> {
  toDomain(raw: any): ConfirmDeleteProfile {
    return raw;
  }
}
