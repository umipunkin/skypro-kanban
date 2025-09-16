<template>
  <div class="wrapper">
    <AppHeader />
    <div class="pop-browse" id="popBrowse">
      <div class="pop-browse__container">
        <div class="pop-browse__block">
          <div class="pop-browse__content">
            <div v-if="isLoading" class="loading-message">
              <p>Загрузка данных...</p>
            </div>

            <div v-else-if="!currentTask" class="error-message">
              <p>Задача не найдена</p>
              <button @click="handleClose" class="_btn-bg _hover01">Вернуться на главную</button>
            </div>

            <div v-else>
              <div class="pop-browse__top-block">
                <h3 class="pop-browse__ttl">Просмотр задачи</h3>
                <div class="categories__theme theme-top _orange _active-category">
                  <p class="_orange">{{ currentTask.topic || 'Web Design' }}</p>
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
                      :value="currentTask.description || ''"
                      placeholder="Введите описание задачи..."
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
                          currentTask.date
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
                  <p class="_orange">{{ currentTask.topic || 'Web Design' }}</p>
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
                <button class="btn-browse__close _btn-bg _hover01" @click="handleClose">
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { deleteTask } from '@/services/api'

const route = useRoute()
const router = useRouter()
const taskId = ref(null)
const isLoading = ref(true)

const tasks = inject('tasks', [])
const loadTasks = inject('loadTasks', () => {})
const tasksPromise = inject('tasksPromise', null)

onMounted(async () => {
  try {
    if (tasksPromise.value) {
      await tasksPromise.value
    } else {
      await loadTasks()
    }

    const task = tasks.value.find(
      (task) => task.id === route.params.id || task._id === route.params.id,
    )

    if (task) {
      taskId.value = task._id || task.id
    }
  } catch (error) {
    console.error('Error loading tasks:', error)
  } finally {
    isLoading.value = false
  }
})

const currentTask = computed(() => {
  return tasks.value.find((task) => task.id === taskId.value || task._id === taskId.value)
})

const handleTaskDeleted = async () => {
  if (!taskId.value) {
    alert('ID задачи не найден')
    return
  }

  if (!confirm('Вы уверены, что хотите удалить эту задачу?')) {
    return
  }

  try {
    await deleteTask(taskId.value)
    await loadTasks()
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error)
    alert('Не удалось удалить задачу: ' + error.message)
  }
}

const handleEditTask = () => {
  if (taskId.value) {
    router.push({ name: 'edit-task', params: { id: taskId.value } })
  }
}

const handleClose = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.loading-message,
.error-message {
  text-align: center;
  padding: 40px;
  color: #94a6be;
}

.error-message button {
  margin-top: 20px;
}
</style>
