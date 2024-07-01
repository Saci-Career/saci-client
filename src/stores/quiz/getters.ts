import type { QuizResult } from '../../domain/QuizResult'
import { post } from '../../services/http'
import type { QuizAnswers } from '@/domain/QuizAnswer'

async function getQuizResult(quizAnswer: QuizAnswers): Promise<QuizResult> {
  const response = await post<QuizResult>('/quiz/evaluate-answers', quizAnswer)
  return response
}

export { getQuizResult }
