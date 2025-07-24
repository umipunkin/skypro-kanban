<script setup>
import KanbanColumn from '@/components/KanbanColumn.vue'

const columns = [
  { title: 'Без статуса', id: 'no-status' },
  { title: 'Нужно сделать', id: 'todo' },
  { title: 'В работе', id: 'in-progress' },
  { title: 'Тестирование', id: 'testing' },
  { title: 'Готово', id: 'done' }
]


</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <KanbanColumn 
            v-for="column in columns" 
            :key="column.id"
            :title="column.title"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

</style>