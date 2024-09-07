import { CircuitQuizList } from '../../../../domain/entities';
import { Mapper } from '../../../../domain/models';

export class FetchCircuitQuizMapper implements Mapper<CircuitQuizList> {
  toDomain(raw: any): CircuitQuizList {
    return raw.map((step: any) => {
      const { id, latitude, longitude, paragraph, hint, question, transition } =
        step;

      const content = [
        {
          paragraph,
          hint,
          question,
        },
        {
          transition,
        },
      ];

      return {
        id,
        latitude,
        longitude,
        content,
      };
    });
  }
}
