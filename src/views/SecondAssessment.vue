<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRolesStore } from '@/stores/roles'
import { ElSlider, ElButton } from 'element-plus'
import type { Role } from '@/domain/Role'
import { ErrorMessage, SuccessMessage } from '@/services/messages'
import { useQuizStore } from '@/stores/quiz'

const roleId = ref('1')
const rolesStore = useRolesStore()
const role = ref<Role>({ name: '', knowledges: [], levels: [] })
const quizStore = useQuizStore()

onMounted(async () => {
  role.value = await rolesStore.getRoleById(roleId.value)
  quizStore.initializeQuizAnswers(role.value.knowledges ?? [])
})

const getResult = async () => {
  if (!quizStore.quizAnswers) {
    ErrorMessage('No data provided')
  }
  SuccessMessage('Fetching your results...')
  try {
    await quizStore.getQuizResult(quizStore.quizAnswers.value)
  } catch (error) {
    ErrorMessage('Error getting your result')
  }
}
</script>

<template>
  <div class="PageWrapper">
    <div class="Container">
      <h2>
        Now, level the ability you think you <br />
        have in each technology below. 0 you <br />know nothing, and 5 you master the knowledge
      </h2>
      <div v-for="(knowledge, index) in role.knowledges" :key="index" class="KnowledgeItem">
        <div class="KnowledgeName">{{ knowledge.name }}</div>
        <div class="KnowledgeInputs">
          <ElSlider
            v-model="quizStore.quizAnswers.answers[index].answer"
            :min="0"
            :max="5"
            :step="1"
            show-stops
          />
        </div>
      </div>
      <ElButton type="primary" @click="getResult()">Get Result</ElButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.PageWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h2 {
  text-align: center;
  padding-bottom: 60px;
}

.KnowledgeItem {
  text-align: center;
  display: flex;
  padding-bottom: 30px;
  .KnowledgeName {
    text-align: left;
  }
  .el-slider {
    width: 13vw;
    height: 2vh;
  }
  .KnowledgeInputs {
    display: flex;
    justify-content: flex-end;
  }
}

.KnowledgeName,
.KnowledgeInputs {
  flex: 1;
}

.Container {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: center;
  img {
    width: 10vw;
  }
}
</style>
