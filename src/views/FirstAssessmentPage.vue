<template>
  <div class="Container">
    <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" class="logo" />
    <h1>Choose the role you want</h1>
    <div class="Dropdown">
      <ElSelect
        v-model="localSelectedRole"
        placeholder="Select a role"
        size="large"
        style="width: 240px"
      >
        <ElOption
          v-for="item in rolesStore.roles"
          :key="item.name"
          :label="item.label"
          :value="item.name"
          @click="handleRoleChange(item)"
        />
      </ElSelect>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElOption, ElSelect } from 'element-plus'
import { useRolesStore } from '@/stores/roles'
import { useQuizStore } from '@/stores/quiz'
import type { Role } from '@/domain/Role'
import { ErrorMessage } from '@/services/messages'

const rolesStore = useRolesStore()
const quizStore = useQuizStore()

onMounted(async () => {
  await rolesStore.fetchRoles()
})

const localSelectedRole = ref()

const handleRoleChange = (role: Role) => {
  try {
    quizStore.setSelectedRole(role)
  } catch (error) {
    ErrorMessage('Failed to set selected role')
  }
}
</script>

<style>
.Container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}

.Dropdown {
  width: 240px;
}
</style>
