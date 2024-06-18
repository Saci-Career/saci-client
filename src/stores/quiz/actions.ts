import type { Knowledge } from '@/domain/Knowledge'
import type { QuizAnswers } from '@/domain/QuizAnswer'
import { post } from '@/services/http'
import { quizAnswer } from './state'
import type { Role } from '@/domain/Role'

const initializeQuizAnswers = (knowledges: Knowledge[], quizAnswers: QuizAnswers) => {
  quizAnswers.answers = knowledges.map((knowledge) => ({
    knowledgeId: Number(knowledge.id),
    answer: 0
  }))
}

async function getQuizResult(quizAnswer: QuizAnswers) {
  return await post('/calculate-score', quizAnswer)
}

async function setSelectedRole(role: Role) {
  quizAnswer.value.roleId = role.id!
}

export { initializeQuizAnswers, getQuizResult, setSelectedRole }
