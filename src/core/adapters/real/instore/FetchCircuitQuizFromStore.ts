import {
  Circuit,
  CircuitQuizStepKeys,
  CircuitStepsList,
} from '../../../domain/entities';

export class FetchCircuitQuizFromStore {
  private static readonly STEP_KEYS = CircuitQuizStepKeys;

  private checkQuizStepStructure(steps: CircuitStepsList): boolean {
    const result = steps.map((step) => {
      const stepKeys = Object.keys(step);
      return Object.values(FetchCircuitQuizFromStore.STEP_KEYS).every((key) =>
        stepKeys.includes(key)
      );
    });

    if (result.includes(false)) {
      return false;
    }

    return true;
  }

  public async execute(request: Circuit): Promise<Circuit['step'] | null> {
    try {
      if (!request?.step) {
        throw new Error(
          'Problème de chargement du circuit ! Veuillez réessayer plus tard.'
        );
      }

      const isQuizStepStructureExist = this.checkQuizStepStructure(
        request.step
      );

      if (!isQuizStepStructureExist) {
        throw new Error(
          'Problème de structure des étapes du circuit ! Veuillez réessayer plus tard.'
        );
      }

      return request.step;
    } catch (error) {
      throw new Error(
        'Erreur lors de la récupération des étapes du circuit ! Veuillez réessayer plus tard.'
      );
    }
  }
}
