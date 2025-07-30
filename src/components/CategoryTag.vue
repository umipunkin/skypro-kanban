<script setup>

const colorDict = {
  'Web Design': '_orange',
  'Research': '_green',
  'Copywriting': '_purple'
  
}
defineProps({
  category: {
    type: String,
    default: 'Web Design'
  }
})


</script>

<template>
  <div class="card__theme" :class="colorDict[category]">
    <p :class="colorDict[category]">{{ category }}</p>
  </div>
</template>

<style lang="scss" scoped>

</style>