<script setup>
defineProps({
  category: {
    type: String,
    default: 'Web Design'
  }
})


</script>

<template>
  <div class="card__theme _orange">
    <p class="_orange">{{ category }}</p>
  </div>
</template>

<style lang="scss" scoped>

</style>