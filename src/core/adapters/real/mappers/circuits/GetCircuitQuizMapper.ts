import { Mapper } from '../../../../domain/models';
import { CircuitQuizList } from '../../../../domain/entities';

export class GetCircuitMapper implements Mapper<CircuitQuizList> {
  toDomain(raw: any): CircuitQuizList {
    return raw;
  }
}
