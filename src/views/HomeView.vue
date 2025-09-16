<script setup>
import AppHeader from '@/components/AppHeader.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import { inject, onMounted, ref } from 'vue'

const tasks = inject('tasks', [])
const isLoading = inject('isLoading', false)
const loadTasks = inject('loadTasks')
const error = inject('error', ref(''))

onMounted(() => {
  if (loadTasks) {
    loadTasks()
  }
})
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <div v-if="error" class="error-message">Ошибка загрузки задач: {{ error }}</div>
    <KanbanBoard :tasks="tasks" :is-loading="isLoading" />
  </div>
</template>

<style scoped>
.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  text-align: center;
}
</style>
