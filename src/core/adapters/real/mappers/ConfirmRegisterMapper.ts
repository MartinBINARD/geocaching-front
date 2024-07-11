import { ConfirmRegister } from '../../../domain/entities';
import { Mapper } from '../../../domain/models/Mapper';

export class confirmRegisterMapper implements Mapper<ConfirmRegister> {
  toDomain(raw: any): ConfirmRegister {
    const { message } = raw;

    return { message };
  }
}
