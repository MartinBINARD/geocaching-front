interface Step {
  id_step: number;
  answer: number;
}

type StepList = Step[];

export interface SendUserQuizAnswersRequest {
  id_user: number;
  id_circuit: number;
  steps: StepList;
}
