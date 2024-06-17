import { defineStore } from 'pinia'
import { quizAnswer } from './state'
import { initializeQuizAnswers, getQuizResult } from './actions'

export const useQuizStore = defineStore('quizAnswer', () => {
  return {
    quizAnswer,
    initializeQuizAnswers,
    getQuizResult
  }
})
