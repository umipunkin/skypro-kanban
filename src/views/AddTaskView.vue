<template>
  <div class="pop-new-card" id="popNewCard">
    <div class="pop-new-card__container">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <a href="#" class="pop-new-card__close" @click.prevent="closeModal">&#10006;</a>

          <div class="pop-new-card__wrap">
            <form class="pop-new-card__form form-new" id="formNewCard" @submit.prevent="submitForm">
              <div class="form-new__block">
                <label for="formTitle" class="subttl">Название задачи</label>
                <input
                  v-model.trim="formData.title"
                  class="form-new__input"
                  type="text"
                  name="name"
                  id="formTitle"
                  placeholder="Введите название задачи..."
                  required
                />
              </div>
              <div class="form-new__block">
                <label for="textArea" class="subttl">Описание задачи</label>
                <textarea
                  v-model.trim="formData.description"
                  class="form-new__area"
                  name="text"
                  id="textArea"
                  placeholder="Введите описание задачи..."
                ></textarea>
              </div>
            </form>

            <AppCalendar
              class="pop-new-card__calendar"
              @change-date="($event) => (formData.date = $event)"
            />
          </div>

          <div class="pop-new-card__categories categories">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__themes">
              <div
                v-for="category in categories"
                :key="category.id"
                :class="[
                  'categories__theme',
                  `_${category.color}`,
                  { '_active-category': selectedCategory === category.id },
                ]"
                @click="selectCategory(category)"
              >
                <p :class="`_${category.color}`">{{ category.name }}</p>
              </div>
            </div>
          </div>

          <button class="form-new__create _hover01" @click="addTask">Создать задачу</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppCalendar from '@/components/AppCalendar.vue'
import { ref } from 'vue'
import { createTask } from '@/services/api'
import router from '@/router'

const selectedCategory = ref(1)

const categories = ref([
  { id: 1, name: 'Web Design', color: 'orange' },
  { id: 2, name: 'Research', color: 'green' },
  { id: 3, name: 'Copywriting', color: 'purple' },
])

const formData = ref({
  title: '',
  topic: categories.value[0].name,
  status: 'Без статуса',
  description: '',
  date: new Date(),
})

const selectCategory = (category) => {
  selectedCategory.value = category.id
  formData.value.topic = category.name
}

const closeModal = () => {
  router.push('/')
}

const addTask = () => {
  if (!formData.value.title) {
    alert('Введите название задачи')
    return
  }
  if (!formData.value.description) {
    alert('Введите описание задачи')
    return
  }

  const task = {
    title: formData.value.title,
    description: formData.value.description,
    date: formData.value.date.toISOString(),
    topic: formData.value.topic,
    status: formData.value.status,
  }

  createTask(task).then(closeModal)
}
</script>

<style scoped>
.categories__theme {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.categories__theme:hover {
  transform: scale(1.05);
}
</style>
