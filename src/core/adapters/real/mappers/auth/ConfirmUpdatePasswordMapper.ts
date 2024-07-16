import { ConfirmUpdatePassword } from '../../../../domain/entities/ConfirmUpdatePassword';
import { Mapper } from '../../../../domain/models';

export class ConfirmUpdatePasswordMapper
  implements Mapper<ConfirmUpdatePassword>
{
  toDomain(raw: any): ConfirmUpdatePassword {
    return raw;
  }
}
