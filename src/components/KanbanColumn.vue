<script setup>
import TaskCard from '@/components/TaskCard.vue';

defineProps({
  title: String,
  tasks: Array,
});
</script>

<template>
  <div class="column">
    <div class="column__header">
      <h3 class="column__title">{{ title }}</h3>
      <span class="column__count">{{ tasks.length }}</span>
    </div>
    <div class="column__content">
      <TaskCard 
        v-for="task in tasks" 
        :key="task.id"
        :task="task"
      />
      <div v-if="tasks.length === 0" class="column__empty">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5.99L19.53 19H4.47L12 5.99ZM12 2L1 21H23L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z" fill="#94A6BE"/>
        </svg>
        <p>Нет задач</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  border-radius: 8px;
  padding: 12px;
  height: fit-content;
}

.column__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
}

.column__title {
  padding: 0 10px;
  margin: 15px 0;
  color: #94A6BE;
}
.column__title p {
  color: #94A6BE;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.column__count {
  background: #eaeaea;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.column__content {
  display: grid;
  gap: 8px;
}

.column__empty {
  padding: 20px;
  text-align: center;
  color: #94A6BE;
  font-size: 14px;
}

.column__empty svg {
  opacity: 0.6;
  margin-bottom: 8px;
}
</style>