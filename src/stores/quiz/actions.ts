import type { Knowledge } from '@/domain/Knowledge'
import { quizAnswers } from './state'
import type { Role } from '@/domain/Role'
import type { Answer } from '@/domain/Answer'

const initializeQuizAnswers = (knowledges: Knowledge[]) => {
  quizAnswers.value.answers = knowledges.map((knowledge) => ({
    knowledgeId: knowledge.id,
    answer: 0
  })) as Answer[]
}

async function setSelectedRole(role: Role) {
  quizAnswers.value.roleId = role.id
}

export { initializeQuizAnswers, setSelectedRole }
