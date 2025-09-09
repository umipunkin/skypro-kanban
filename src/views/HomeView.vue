<script setup>
import AppHeader from '@/components/AppHeader.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import { inject } from 'vue'

const tasks = inject('tasks', [])
const isLoading = inject('isLoading', false)
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <KanbanBoard :tasks="tasks" :is-loading="isLoading" />
  </div>
</template>
