import { Circuit, CircuitStepsList } from '../../../domain/entities';

const STEP_KEYS = [
  'id',
  'hint',
  'latitude',
  'longitude',
  'paragraph',
  'question',
  'transition',
];

function checkQuizStepStructure(steps: CircuitStepsList): boolean {
  const result = steps.map((step) => {
    const stepKeys = Object.keys(step);

    return STEP_KEYS.every((key) => stepKeys.includes(key));
  });

  if (result.includes(false)) {
    return false;
  }

  return true;
}

function circuitQuizStepsMapper(steps: CircuitStepsList) {
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

export default function getCircuitQuizInStore(circuit: Circuit) {
  return new Promise((resolve, reject) => {
    const isQuizStepStructureExist = checkQuizStepStructure(circuit?.step);

    if (!circuit.step) {
      reject(
        new Error(
          'Problème de chargement du circuit ! Veuillez réessayer plus tard.'
        )
      );
    }

    if (!isQuizStepStructureExist) {
      reject(
        new Error(
          'Problème de structure des étapes du circuit ! Veuillez réessayer plus tard.'
        )
      );
    }

    const circuitQuizStepper = circuitQuizStepsMapper(circuit.step);

    resolve(circuitQuizStepper);
  });
}
