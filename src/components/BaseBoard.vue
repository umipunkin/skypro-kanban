<template>
  <div class="board">
    <div class="board__columns">
      <TaskColumn 
        v-for="column in columns" 
        :key="column.id"
        :title="column.title"
        :tasks="filteredTasks(column.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { tasks } from '@/components/mocks/tasks';
import TaskColumn from './TaskColumn.vue';

const columns = [
  { id: 'no-status', title: 'Без статуса' },
  { id: 'todo', title: 'Нужно сделать' },
  { id: 'in-progress', title: 'В работе' },
  { id: 'testing', title: 'Тестирование' },
  { id: 'done', title: 'Готово' }
];

const filteredTasks = (status) => tasks.filter(task => task.status === status);
</script>

<style scoped>
.board {
  padding: 20px 0;
}

.board__columns {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  align-items: start;
}

@media (max-width: 768px) {
  .board__columns {
    grid-template-columns: 1fr;
    overflow-x: auto;
    padding-bottom: 20px;
  }
}
</style>