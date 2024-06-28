<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { ErrorMessage } from '@/services/messages'

const quizStore = useQuizStore()

onMounted(async () => {
  const roleId = 1
  const answers = [
    { knowledgeId: 1, answer: 5 },
    { knowledgeId: 2, answer: 4 },
    { knowledgeId: 5, answer: 5 },
    { knowledgeId: 6, answer: 5 }
  ]

  const quizAnswer = { roleId, answers }

  try {
    await quizStore.updateQuizResult(quizAnswer)
  } catch (error) {
    ErrorMessage('Failed to fetch quiz result.')
  }
})
</script>

<template>
  <div class="ResultScreen">
    <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" class="Logo" />
    <p>
      Considering your responses, you are considered<br />
      a <strong>{{ quizStore.quizResult.currentLevel?.name }}</strong
      >!
    </p>
    <p v-if="quizStore.quizResult.nextLevel">
      If you want to evolve technically, click
      <a :href="quizStore.quizResult.nextLevel.link">here</a> to get access<br />
      to a technical knowledge path
    </p>
    <p v-else>You are currently at the highest level.</p>
  </div>
</template>

<style scoped lang="scss">
.ResultScreen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;

  .Logo {
    width: 100px;
    margin-bottom: 20px;
  }
}
</style>
