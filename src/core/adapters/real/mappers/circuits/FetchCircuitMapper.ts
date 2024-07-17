import { Mapper } from '../../../../domain/models';
import { Circuit } from '../../../../domain/entities';

export class FetchCircuitMapper implements Mapper<Circuit> {
  toDomain(raw: any): Circuit {
    const {
      id_circuit,
      city,
      description,
      difficulty,
      distance,
      duration,
      introduction,
      latitude,
      longitude,
      maintenance,
      mobility,
      name,
      parking_address,
      region,
      state,
      terrain,
      theme,
      url_image,
      url_reward,
    } = raw;

    return {
      id_circuit,
      city,
      description,
      difficulty,
      distance,
      duration,
      introduction,
      latitude,
      longitude,
      maintenance,
      mobility,
      name,
      parking_address,
      region,
      state,
      terrain,
      theme,
      url_image,
      url_reward,
    };
  }
}
