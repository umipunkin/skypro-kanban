<template>
  <div class="wrapper">
    <AppHeader />
    <div class="pop-browse" id="popBrowse">
      <div class="pop-browse__container">
        <div class="pop-browse__block">
          <div class="pop-browse__content">
            <div class="pop-browse__top-block">
              <h3 class="pop-browse__ttl">Просмотр задачи #{{ taskId }}</h3>
              <div class="categories__theme theme-top _orange _active-category">
                <p class="_orange">{{ currentTask?.topic || 'Web Design' }}</p>
              </div>
            </div>

            <div class="pop-browse__wrap">
              <form class="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div class="form-browse__block">
                  <label for="textArea01" class="subttl">Описание задачи</label>
                  <textarea
                    class="form-browse__area"
                    name="text"
                    id="textArea01"
                    readonly
                    :placeholder="currentTask?.description || 'Введите описание задачи...'"
                    v-model="currentTaskDescription"
                  ></textarea>
                </div>
              </form>
              <div class="pop-new-card__calendar calendar">
                <p class="calendar__ttl subttl">Даты</p>
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Срок исполнения:
                    <span class="date-control">
                      {{
                        currentTask?.date
                          ? new Date(currentTask.date).toLocaleDateString('ru-RU')
                          : 'Не установлен'
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="theme-down__categories theme-down">
              <p class="categories__p subttl">Категория</p>
              <div class="categories__theme _orange _active-category">
                <p class="_orange">{{ currentTask?.topic || 'Web Design' }}</p>
              </div>
            </div>

            <div class="pop-browse__btn-browse">
              <div class="btn-group">
                <button class="btn-browse__edit _btn-bor _hover03" @click="handleEditTask">
                  <a href="#">Редактировать задачу</a>
                </button>
                <button class="btn-browse__delete _btn-bor _hover03" @click="handleTaskDeleted">
                  <a href="#">Удалить задачу</a>
                </button>
              </div>
              <button
                class="btn-browse__close _btn-bg _hover01"
                @click="$router.push({ name: 'home' })"
              >
                <a href="#">Закрыть</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const taskId = ref(null)

const tasks = inject('tasks', [])
const loadTasks = inject('loadTasks', () => {})

const currentTask = ref(null)

onMounted(() => {
  taskId.value = route.params.id
  currentTask.value = tasks.value.find((task) => task.id === taskId.value)
})

const handleTaskDeleted = async () => {
  await loadTasks()
}

const handleEditTask = () => {}
</script>
