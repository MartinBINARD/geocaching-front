import { Mapper } from '../../../../domain/models';
import { UserQuizResult } from '../../../../domain/entities';

export class SendUserQuizAnswersMapper implements Mapper<UserQuizResult> {
  toDomain(raw: any): UserQuizResult {
    return raw;
  }
}
