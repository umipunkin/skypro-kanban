<script setup>
import CategoryTag from '@/components/CategoryTag.vue'
import TaskMenuButton from '@/components/TaskMenuButton.vue'
import TaskDate from '@/components/TaskDate.vue'


</script>

<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <CategoryTag category="Web Design" />
        <TaskMenuButton />
      </div>
      <div class="card__content">
        <a href="" target="_blank">
          <h3 class="card__title">Название задачи</h3>
        </a>
        <TaskDate />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>