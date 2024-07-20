import { Mapper } from '../../../../domain/models';
import { CircuitQuiz } from '../../../../domain/entities';

export class GetCircuitMapper implements Mapper<CircuitQuiz> {
  toDomain(raw: any): CircuitQuiz {
    const { id, latitude, longitude, content } = raw;

    return {
      id,
      latitude,
      longitude,
      content,
    };
  }
}
