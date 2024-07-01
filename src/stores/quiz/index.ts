import { defineStore } from 'pinia'
import { quizResult, quizAnswers } from './state'
import { initializeQuizAnswers, setSelectedRole } from './actions'
import type { QuizAnswers } from '@/domain/QuizAnswer'
import type { QuizResult } from '@/domain/QuizResult'
import { getQuizResult } from './getters'

export const useQuizStore = defineStore('quizAnswer', () => {
  const updateQuizResult = async (quizAnswer: QuizAnswers): Promise<void> => {
    const scoreResponse: QuizResult = await getQuizResult(quizAnswer)

    if (!scoreResponse.currentLevel) {
      throw new Error('Current level data is missing in the response.')
    }

    quizResult.currentLevel = scoreResponse.currentLevel
    quizResult.nextLevel = scoreResponse.nextLevel ?? undefined
  }

  return {
    quizAnswers,
    quizResult,
    initializeQuizAnswers,
    getQuizResult,
    updateQuizResult,
    setSelectedRole
  }
})
