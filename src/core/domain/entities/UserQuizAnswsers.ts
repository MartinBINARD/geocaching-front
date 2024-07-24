export interface UserQuizAnswers {
  id_user: number;
  id_circuit: number;
  steps: Record<string, string>[];
}
