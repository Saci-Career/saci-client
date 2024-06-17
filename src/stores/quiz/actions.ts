import type { Knowledge } from '@/domain/Knowledge'
import type { QuizAnswers } from '@/domain/QuizAnswer'
import { post } from '@/services/http'

const initializeQuizAnswers = (knowledges: Knowledge[], quizAnswers: QuizAnswers) => {
  quizAnswers.answers = knowledges.map((knowledge) => ({
    knowledgeId: Number(knowledge.id),
    answer: 0
  }))
}

async function getQuizResult(quizAnswer: QuizAnswers) {
  return await post('/calculate-score', quizAnswer)
}

export { initializeQuizAnswers, getQuizResult }
