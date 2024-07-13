import { ConfirmForgotPassword } from '../../../domain/entities';
import { Mapper } from '../../../domain/models';

export class ConfirmForgotPasswordMapper
  implements Mapper<ConfirmForgotPassword>
{
  toDomain(raw: any): ConfirmForgotPassword {
    return raw;
  }
}
