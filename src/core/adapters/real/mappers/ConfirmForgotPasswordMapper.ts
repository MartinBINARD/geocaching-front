import { ConfirmForgotPassword } from '../../../domain/entities';
import { Mapper } from '../../../domain/models';

export class ForgotPasswordMapper implements Mapper<ConfirmForgotPassword> {
  toDomain(raw: any): ConfirmForgotPassword {
    return raw;
  }
}
