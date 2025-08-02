<script setup>
import { ref, onMounted } from 'vue';
import  KanbanColumn  from '@/components/KanbanColumn.vue';
import { tasks } from '@/components/mocks/tasks';

const columns = [
  { title: 'Без статуса', id: 'no-status' },
  { title: 'Нужно сделать', id: 'todo' },
  { title: 'В работе', id: 'in-progress' },
  { title: 'Тестирование', id: 'testing' },
  { title: 'Готово', id: 'done' }
];

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500); 
});
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div v-if="isLoading" class="loading-text">
          Данные загружаются...
        </div>
        <div v-else class="main__content">
          <KanbanColumn 
            v-for="column in columns" 
            :key="column.id"
            :title="column.title"
            :tasks="tasks.filter(task => task.status === column.id)"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.loading-text {
  text-align: center;
  font-size: 18px;
  color: #94A6BE;
  padding: 50px;
}
</style>