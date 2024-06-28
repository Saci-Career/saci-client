import type { Level } from '@/domain/Level'
import type { QuizAnswers } from '@/domain/QuizAnswer'
import type { QuizResult } from '@/domain/QuizResult'
import { reactive, ref, type Ref } from 'vue'

const quizAnswers: Ref<QuizAnswers> = ref({ roleId: 0, answers: [] })

const quizResult: QuizResult = reactive({
  currentLevel: {} as Level,
  nextLevel: {} as Level
})

export { quizAnswers, quizResult }
