<template>
  <div>
    <div class="Container" ref="roleSectionRef">
      <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" class="Logo" />
      <h1>Choose the role you want</h1>
      <div class="Dropdown">
        <ElSelect
          v-model="localSelectedRole"
          placeholder="Select a role"
          size="large"
          @change="handleRoleChange"
        >
          <ElOption
            v-for="item in rolesStore.roles"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          />
        </ElSelect>
      </div>
    </div>

    <div
      v-if="role && role.knowledges && role.knowledges.length"
      class="KnowledgeContainer"
      ref="knowledgeSectionRef"
    >
      <h2>
        Now, level the ability you think you <br />
        have in each technology below. 0 you <br />know nothing, and 5 you master the knowledge
      </h2>
      <div v-for="(knowledge, index) in role.knowledges" :key="index" class="KnowledgeItem">
        <div class="KnowledgeName">{{ knowledge.name }}</div>
        <div class="KnowledgeInput">
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

    <div
      v-if="showResultScreen && quizStore.quizResult && role"
      class="ResultScreen"
      ref="resultSectionRef"
    >
      <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" class="Logo" />
      <p>
        Considering your responses, you are considered<br />
        a <strong>{{ quizStore.quizResult.currentLevel?.name }}</strong
        >!
      </p>
      <p v-if="quizStore.quizResult.nextLevel">
        If you want to evolve technically, click
        <a :href="quizStore.quizResult.nextLevel.link" target="_blank">here</a> to get access<br />
        to a technical knowledge path
      </p>
      <p v-else>You are currently at the highest level.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { ElOption, ElSelect, ElSlider, ElButton } from 'element-plus'
import { useRolesStore } from '@/stores/roles'
import { useQuizStore } from '@/stores/quiz'
import type { Role } from '@/domain/Role'
import { ErrorMessage } from '@/services/messages'
import { CloseLoadingScreen, ShowLoadingScreen } from '@/services/loading-screen'

const rolesStore = useRolesStore()
const quizStore = useQuizStore()
const role = ref<Role | null>(null)
const localSelectedRole = ref<string | null>(null)
const showResultScreen = ref<boolean>(false)

const roleSectionRef = ref<HTMLElement | null>(null)
const knowledgeSectionRef = ref<HTMLElement | null>(null)
const resultSectionRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await rolesStore.fetchRoles()
  if (rolesStore.roles.length > 0) {
    localSelectedRole.value = ''
  }
})

const handleRoleChange = async (roleName: string) => {
  const selectedRole = rolesStore.roles.find((role) => role.name === roleName)
  if (!selectedRole) {
    ErrorMessage('Selected role does not exist')
    return
  }
  try {
    role.value = selectedRole
    quizStore.initializeQuizAnswers(selectedRole.knowledges)
    quizStore.setSelectedRole(selectedRole)
    await nextTick()
    scrollToKnowledgeSection()
  } catch (error) {
    ErrorMessage('Failed to set selected role')
  }
}

const scrollToKnowledgeSection = () => {
  knowledgeSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToResultSection = async () => {
  await nextTick()
  resultSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const getResult = async () => {
  ShowLoadingScreen()
  if (!quizStore.quizAnswers) {
    ErrorMessage('No data provided')
    return
  }
  try {
    await quizStore.updateQuizResult(quizStore.quizAnswers)
    CloseLoadingScreen()
    showResultScreen.value = true
    await nextTick()
    scrollToResultSection()
  } catch (error) {
    ErrorMessage('Error getting your result')
  }
}
</script>

<style scoped lang="scss">
.Container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.KnowledgeContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}

.Dropdown .el-select {
  align-items: center;
  width: 240px;
}

h2 {
  text-align: center;
  padding-top: 60px;
  padding-bottom: 60px;
}

.KnowledgeItem {
  display: flex;
  padding-bottom: 30px;
  width: 80%;

  .KnowledgeName {
    flex-grow: 1;
  }

  .KnowledgeInput {
    width: 45vw;
    display: flex;
    justify-content: left;
  }
}

.ResultScreen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;
}
</style>
