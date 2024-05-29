<template>
  <div id="greetings">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const message = ref('Loading...')

const fetchMessage = async (): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8080/api/hello')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.text()
    return data
  } catch (error) {
    console.error('Error fetching message:', error)
    return 'Error: Unable to fetch message from the backend.'
  }
}

// Lifecycle hook to fetch message on mount
onMounted(() => {
  fetchMessage().then((msg) => {
    message.value = msg
  })
})
</script>
