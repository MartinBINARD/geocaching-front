import { CircuitWithoutSteps } from '../../../domain/entities';
import {
  FilterCircuitListRequest,
  SearchCircuitsRequest,
} from '../../requests';

export class FilterCircuitListFromStore {
  private readonly DEFAULT_VALUES = ['Toutes', 'Tous'];
  private readonly EXCEPT_VALUE = 'mobility';

  public async execute({
    search,
    circuitsList,
  }: FilterCircuitListRequest): Promise<CircuitWithoutSteps[]> {
    return new Promise((resolve, reject) => {
      const filteredSearchObject = this.filterDefaultSearchKeys(search);

      const result = circuitsList.filter((circuit) => {
        return this.parseSearchObject(circuit, filteredSearchObject);
      });

      if (!Object.keys(filteredSearchObject).length) {
        resolve(circuitsList);
      }

      if (!result.length) {
        reject(new Error('Aucun résultat ne correspond à votre recherche !'));
      }

      resolve(result);
    });
  }

  private filterDefaultSearchKeys(obj: SearchCircuitsRequest): Object {
    return Object.keys(obj)
      .filter(
        (key) =>
          !this.DEFAULT_VALUES.includes(obj[key as keyof SearchCircuitsRequest])
      )
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: obj[key as keyof SearchCircuitsRequest],
        }),
        {}
      );
  }

  private parseSearchObject(
    circuit: CircuitWithoutSteps,
    stringifiedSearchObj: Object
  ): boolean {
    return Object.entries(stringifiedSearchObj).every(([key, value]) => {
      if (key === this.EXCEPT_VALUE) {
        return this.findSelectedMobilityValue(circuit, key, value);
      }

      return this.stringifyCircuitObjectValues(circuit, key, value);
    });
  }

  private findSelectedMobilityValue(
    circuit: CircuitWithoutSteps,
    key: keyof CircuitWithoutSteps,
    value: string
  ): boolean {
    const arrayValues = circuit[key] as string[];

    return arrayValues.find((v) => v === value) !== undefined;
  }

  private stringifyCircuitObjectValues(
    circuit: CircuitWithoutSteps,
    key: string,
    value: string
  ): boolean {
    const keyValue = circuit[key as keyof CircuitWithoutSteps];

    if (typeof keyValue !== 'string') {
      return keyValue.toString() === value;
    }

    return keyValue === value;
  }
}
