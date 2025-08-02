<script setup>
import CategoryTag from '@/components/CategoryTag.vue';
import TaskMenuButton from '@/components/TaskMenuButton.vue';
import TaskDate from '@/components/TaskDate.vue';

defineProps({
  task: Object,
});
</script>

<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <CategoryTag :category="task.topic" />
        <TaskMenuButton />
      </div>
      <div class="card__content">
        <a href="" target="_blank">
          <h3 class="card__title">{{ task.title }}</h3>
        </a>
        <TaskDate :date="task.date" />
      </div>
    </div>
  </div>
</template>