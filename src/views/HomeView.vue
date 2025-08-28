<script setup>
import AppHeader from '@/components/AppHeader.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import { fetchTasks } from '@/assets/services/api'
import { onMounted, ref } from 'vue'

const tasks = ref([])
const error = ref('')
const isLoading = ref(false)

const getTasks = async () => {
  try {
    isLoading.value = true
    const data = await fetchTasks()
    tasks.value = data
  } catch (err) {
    error.value = err.message
    console.error('Ошибка при получении задач:', error)
  } finally {
    isLoading.value = false
  }
}
onMounted(getTasks)
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <KanbanBoard :tasks="tasks" :is-loading="isLoading" />
  </div>
</template>
