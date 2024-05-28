<template>
  <HelloWorld />
</template>

<template>
  <div id="greetings">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  data() {
    return {
      message: 'Loading...'
    }
  },
  mounted() {
    this.fetchMessage().then((message) => {
      this.message = message
    })
  },
  methods: {
    async fetchMessage(): Promise<string> {
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
  }
})
</script>
