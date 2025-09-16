<script setup>
import { ref, provide, onMounted } from 'vue'
import { fetchTasks } from '@/services/api'
import { getUser, isLoggedIn } from '@/utils/auth'

const user = ref(getUser())
const tasks = ref([])
const isLoading = ref(false)
const error = ref('')
const tasksPromise = ref(null)

provide('user', user)
provide('tasks', tasks)
provide('isLoading', isLoading)
provide('error', error)
provide('tasksPromise', tasksPromise)

const loadTasks = async () => {
  if (!isLoggedIn()) {
    tasks.value = []
    return Promise.resolve([])
  }

  try {
    isLoading.value = true
    tasksPromise.value = fetchTasks()
    const data = await tasksPromise.value
    tasks.value = Array.isArray(data) ? data : []
    return data
  } catch (err) {
    error.value = err.message
    console.error('Ошибка при получении задач:', error.value)
    tasks.value = []
    throw err
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
