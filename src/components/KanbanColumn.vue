<script setup>
import TaskCard from '@/components/TaskCard.vue'

defineProps({
  title: String
})


</script>

<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <TaskCard v-for="i in 3" :key="i" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>