<script setup>
import TaskCard from '@/components/TaskCard.vue';

defineProps({
  title: String,
  tasks: Array,
});
</script>

<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <TaskCard 
        v-for="task in tasks" 
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>