import { GetCircuitQuizRequest } from '../../adapters/requests/circuits/getCircuitQuizRequest';
import { Circuit } from '../../domain/entities';

const STEPS_KEYS = [
  'id',
  'hint',
  'latitude',
  'longitude',
  'paragraph',
  'question',
  'transition',
];

function checkQuizStepStructure(steps: GetCircuitQuizRequest): boolean {
  const result = steps.map((step) => {
    const stepKeys = Object.keys(step);

    return stepKeys.every((key) => STEPS_KEYS.includes(key));
  });

  if (result.includes(false)) {
    return false;
  }

  return true;
}

function circuitQuizStepsMapper(steps: GetCircuitQuizRequest) {
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

export default function getCircuitQuiz(circuit: Circuit) {
  return new Promise((resolve, reject) => {
    const isQuizStepStructureExist = checkQuizStepStructure(circuit?.step);

    if (!circuit.step) {
      reject(
        new Error(
          'Problème de chargement des étapes du circuit ! Veuillez réessayer plus tard.'
        )
      );
    }

    if (!isQuizStepStructureExist) {
      reject(
        new Error(
          'Problème de chargement des étapes du circuit ! Veuillez réessayer plus tard.'
        )
      );
    }

    if (isQuizStepStructureExist) {
      const circuitQuizStepper = circuitQuizStepsMapper(circuit.step);

      resolve(circuitQuizStepper);
    }
  });
}
