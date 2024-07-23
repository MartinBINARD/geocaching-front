import { Mapper } from '../../../../domain/models';
import { SendUserQuizAnswersRequest } from '../../../requests/circuits/SendUserQuizAnswsersRequest';

export class SendUserQuizAnswersMapper
  implements Mapper<SendUserQuizAnswersRequest>
{
  toDomain(raw: any): SendUserQuizAnswersRequest {
    const { id_user, id_circuit, steps } = raw;

    return {
      id_user,
      id_circuit,
      steps,
    };
  }
}
