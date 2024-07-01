<template>
  <div class="Container">
    <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" class="Logo" />
    <h1>Choose the role you want</h1>
    <div class="Dropdown">
      <ElSelect v-model="localSelectedRole" placeholder="Select a role" size="large">
        <ElOption
          v-for="item in rolesStore.roles"
          :key="item.name"
          :label="item.label"
          :value="item.name"
          @change="handleRoleChange"
        />
      </ElSelect>
    </div>
  </div>

  <div v-if="role && role.knowledges?.length" class="KnowledgesContainer">
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

  <div v-if="quizStore.quizResult" class="ResultScreen">
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

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { ElOption, ElSelect, ElSlider, ElButton } from 'element-plus'
import { useRolesStore } from '@/stores/roles'
import { useQuizStore } from '@/stores/quiz'
import type { Role } from '@/domain/Role'
import { ErrorMessage, SuccessMessage } from '@/services/messages'

const rolesStore = useRolesStore()
const quizStore = useQuizStore()

const role = ref<Role | null>(null)
const localSelectedRole = ref<string | null>(null)

onMounted(async () => {
  await rolesStore.fetchRoles()
  if (rolesStore.roles.length > 0) {
    localSelectedRole.value = ''
    handleRoleChange(rolesStore.roles[0])
  }
})

const handleRoleChange = (selectedRole: Role) => {
  try {
    role.value = selectedRole
    quizStore.initializeQuizAnswers(selectedRole.knowledges)
    quizStore.setSelectedRole(selectedRole)
  } catch (error) {
    ErrorMessage('Failed to set selected role')
  }
}

const getResult = async () => {
  if (!quizStore.quizAnswers) {
    ErrorMessage('No data provided')
    return
  }
  SuccessMessage('Fetching your results...')
  try {
    await quizStore.updateQuizResult(quizStore.quizAnswers)
  } catch (error) {
    ErrorMessage('Error getting your result')
  }
}
</script>

<style scoped lang="scss">
.Container {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: center;
  margin-bottom: 100vh;
  margin-top: 30vh;
}

.KnowledgesContainer {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: center;
  margin-bottom: 100vh;
  margin-top: 30vh;
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

.ResultScreen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.ResultScreen .Logo {
  width: 100px;
  margin-bottom: 20px;
}
</style>
