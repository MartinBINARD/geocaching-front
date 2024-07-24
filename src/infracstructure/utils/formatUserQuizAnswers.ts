import { UserQuizAnswers } from '../../core/domain/entities/UserQuizAnswsers';

export default function formatUserQuizAnswers(
  userQuizAnswers: UserQuizAnswers
) {
  const { id_user, id_circuit, steps } = userQuizAnswers;

  const formatedSteps = Object.values(steps).map((value, index) => ({
    id_step: index + 1,
    answer: Number(value),
  }));

  return {
    id_user,
    id_circuit,
    steps: formatedSteps,
  };
}
