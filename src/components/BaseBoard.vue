<template>
    <div class="main__block">
      <div class="main__content">
        <TaskColumn title="Без статуса" />
        <TaskColumn title="Нужно сделать" />
        <TaskColumn title="В работе" />
        <TaskColumn title="Тестирование" />
        <TaskColumn title="Готово" />
      </div>
    </div>
  </template>
  
  <script>
  import TaskColumn from './TaskColumn.vue'
  
  export default {
    components: {
      TaskColumn
    }
  }
  </script>

<style lang="scss" scoped>

</style>