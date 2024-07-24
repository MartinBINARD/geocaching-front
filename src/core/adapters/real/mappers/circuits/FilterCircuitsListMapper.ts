import { Mapper } from '../../../../domain/models';
import { CircuitsList } from '../../../../domain/entities';

export class FilterCircuitsListMapper implements Mapper<CircuitsList> {
  toDomain(raw: any): CircuitsList {
    return raw;
  }
}
