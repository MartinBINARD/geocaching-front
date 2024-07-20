import { Mapper } from '../../../../domain/models';
import { CircuitsList } from '../../../../domain/entities/CircuitsList';

export class FetchCircuitsListMapper implements Mapper<CircuitsList> {
  toDomain(raw: any): CircuitsList {
    return raw;
  }
}
