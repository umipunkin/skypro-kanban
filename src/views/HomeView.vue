<script setup>
import AppHeader from '@/components/AppHeader.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
</script>

<template>
  <div class="wrapper">
    <!-- Попапы остаются здесь -->
    <div class="pop-exit" id="popExit">...</div>
    <div class="pop-new-card" id="popNewCard">...</div>
    <div class="pop-browse" id="popBrowse">...</div>
    
    <AppHeader />
    <KanbanBoard />
  </div>
</template>
