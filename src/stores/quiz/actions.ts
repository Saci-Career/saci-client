import type { Knowledge } from '@/domain/Knowledge'
import type { QuizAnswers } from '@/domain/QuizAnswer'
import { post } from '@/services/http'
import { quizAnswers } from './state'
import type { Role } from '@/domain/Role'
import type { Answer } from '@/domain/Answer'
import type { QuizResult } from '@/domain/QuizResult'

const initializeQuizAnswers = (knowledges: Knowledge[]) => {
  quizAnswers.value.answers = knowledges.map((knowledge) => ({
    knowledgeId: knowledge.id,
    answer: 0
  })) as Answer[]
}

async function getQuizResult(quizAnswer: QuizAnswers): Promise<QuizResult> {
  const response = await post<QuizResult>('/quiz/evaluate-answers', quizAnswer)
  return response
}

async function setSelectedRole(role: Role) {
  quizAnswers.value.roleId = role.id
}

const getScoreResponse = async (quizAnswer: QuizAnswers): Promise<QuizResult> => {
  const response = await post<QuizResult>('/quiz/evaluate-answers', quizAnswer)
  return response
}

export { initializeQuizAnswers, getQuizResult, setSelectedRole, getScoreResponse }
