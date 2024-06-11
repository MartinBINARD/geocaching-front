import { CircuitPathStep } from '../domain/entities/circuit';

function createCircuitQuizStepper(steps: CircuitPathStep[]) {
  return steps.map((step) => {
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

export default createCircuitQuizStepper;
