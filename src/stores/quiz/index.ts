import { defineStore } from 'pinia'
import { quizAnswer } from './state'
import { initializeQuizAnswers, getQuizResult, setSelectedRole } from './actions'

export const useQuizStore = defineStore('quizAnswer', () => {
  return {
    quizAnswer,
    initializeQuizAnswers,
    getQuizResult,
    setSelectedRole
  }
})
