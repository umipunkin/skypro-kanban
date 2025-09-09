<script setup>
import { ref, provide, onMounted } from 'vue'
import { fetchTasks } from '@/services/api'
import { getUser, isLoggedIn } from '@/utils/auth'

const user = ref(getUser())
const tasks = ref([])
const isLoading = ref(false)
const error = ref('')

provide('user', user)
provide('tasks', tasks)
provide('isLoading', isLoading)
provide('error', error)

const loadTasks = async () => {
  if (!isLoggedIn()) return

  try {
    isLoading.value = true
    const data = await fetchTasks()
    tasks.value = data
  } catch (err) {
    error.value = err.message
    console.error('Ошибка при получении задач:', error.value)
  } finally {
    isLoading.value = false
  }
}

provide('loadTasks', loadTasks)

onMounted(() => {
  loadTasks()
})
</script>

<template>
  <div class="wrapper">
    <slot />
  </div>
</template>
