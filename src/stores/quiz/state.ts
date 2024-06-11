import type { QuizAnswers } from '@/domain/QuizAnswer'
import { type Ref, ref } from 'vue'

const quizAnswer: Ref<QuizAnswers> = ref({} as QuizAnswers)

export { quizAnswer }
