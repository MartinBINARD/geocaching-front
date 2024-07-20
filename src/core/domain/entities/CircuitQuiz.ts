interface CircuitQuizContentParagraph {
  paragraph: string;
  hint: string | null;
  question: string;
}

interface CircuitQuizContentTransition {
  transition: string;
}

type CircuitQuizContent = [
  CircuitQuizContentParagraph,
  CircuitQuizContentTransition,
];

export interface CircuitQuiz {
  id: number;
  latitude: number;
  longitude: number;
  content: CircuitQuizContent;
}
