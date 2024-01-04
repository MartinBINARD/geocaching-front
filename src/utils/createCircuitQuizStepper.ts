import { CircuitPathStep } from '../@types/circuit';

function createCircuitQuizStepper(steps: CircuitPathStep[]) {
  return steps.map((step) => {
    const { id, latitude, longitude, paragraph, question, transition } = step;
    const content = [
      {
        paragraph,
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
