<template>
  <div id="greetings">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

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
        const response = await axios.get('http://localhost:8080/api/hello')
        return response.data
      } catch (error) {
        console.error('Error fetching message:', error)
        return 'Error: Unable to fetch message from the backend.'
      }
    }
  }
})
</script>
