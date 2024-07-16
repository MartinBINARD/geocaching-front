import { Mapper } from '../../../../domain/models';
import { ConfirmForgotPassword } from '../../../../domain/entities';

export class ConfirmForgotPasswordMapper
  implements Mapper<ConfirmForgotPassword>
{
  toDomain(raw: any): ConfirmForgotPassword {
    return raw;
  }
}
