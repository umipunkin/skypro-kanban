<script setup>
import CategoryTag from '@/components/CategoryTag.vue';
import TaskMenuButton from '@/components/TaskMenuButton.vue';
import TaskDate from '@/components/TaskDate.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  task: Object,
});

const router = useRouter()

const onCardClick = () => router.push(`/tasks/${props.task.id}/edit`)
</script>

<template>
  <div class="cards__item" @click="onCardClick">
    <div class="cards__card card">
      <div class="card__group">
        <CategoryTag :category="task.topic" />
        <TaskMenuButton />
      </div>
      <div class="card__content">
        <router-link class="card__link" is="a" to="/">
            <h3 class="card__title">{{ task.title }}</h3>
          </router-link>
        <TaskDate :date="task.date" />
      </div>
    </div>
  </div>
</template>

<style scoped>

.cards__item {
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
  min-width: 220px;
}

.cards__card {
  width: 100%;
  min-height: 130px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: 1px solid #eaeaea;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
}


.cards__card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

.card__theme {
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
}
.card__theme p {
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
}

.card__group {
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__content {
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}


.card__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
}

.card__link {
  text-decoration: none;
  color: inherit;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>