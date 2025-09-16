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
              <button @click="handleCancel" class="_btn-bg _hover01">Вернуться на главную</button>
            </div>

            <div v-else>
              <div class="pop-browse__top-block">
                <h3 class="pop-browse__ttl">Редактирование задачи</h3>
                <div
                  class="categories__theme theme-top"
                  :class="`_${getCategoryColor(formData.topic)}`"
                >
                  <p :class="`_${getCategoryColor(formData.topic)}`">{{ formData.topic }}</p>
                </div>
              </div>

              <div class="pop-browse__status status">
                <p class="status__p subttl">Статус</p>
                <div class="status__themes">
                  <div
                    v-for="status in statuses"
                    :key="status.id"
                    :class="['status__theme', { '_active-status': formData.status === status.id }]"
                    @click="formData.status = status.id"
                  >
                    <p>{{ status.title }}</p>
                  </div>
                </div>
              </div>

              <div class="pop-browse__wrap">
                <form class="pop-browse__form form-browse" id="formBrowseCard">
                  <div class="form-browse__block">
                    <label for="formTitle" class="subttl">Название задачи</label>
                    <input
                      v-model="formData.title"
                      class="form-browse__input"
                      type="text"
                      id="formTitle"
                      placeholder="Введите название задачи..."
                      required
                    />
                  </div>
                  <div class="form-browse__block">
                    <label for="textArea01" class="subttl">Описание задачи</label>
                    <textarea
                      v-model="formData.description"
                      class="form-browse__area"
                      name="text"
                      id="textArea01"
                      placeholder="Введите описание задачи..."
                      required
                    ></textarea>
                  </div>
                </form>

                <AppCalendar
                  class="pop-new-card__calendar"
                  :initial-date="formData.date"
                  @change-date="formData.date = $event"
                />
              </div>

              <div class="theme-down__categories theme-down">
                <p class="categories__p subttl">Категория</p>
                <div class="categories__themes">
                  <div
                    v-for="category in categories"
                    :key="category.id"
                    :class="[
                      'categories__theme',
                      `_${category.color}`,
                      { '_active-category': formData.topic === category.name },
                    ]"
                    @click="formData.topic = category.name"
                  >
                    <p :class="`_${category.color}`">{{ category.name }}</p>
                  </div>
                </div>
              </div>

              <div class="pop-browse__btn-edit">
                <div class="btn-group">
                  <button class="btn-edit__edit _btn-bg _hover01" @click="handleSave">
                    Сохранить
                  </button>
                  <button class="btn-edit__edit _btn-bor _hover03" @click="handleCancel">
                    Отменить
                  </button>
                  <button class="btn-edit__delete _btn-bor _hover03" @click="handleDelete">
                    Удалить задачу
                  </button>
                </div>
                <button class="btn-edit__close _btn-bg _hover01" @click="handleCancel">
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
import AppCalendar from '@/components/AppCalendar.vue'
import { editTask, deleteTask } from '@/services/api'

const route = useRoute()
const router = useRouter()
const taskId = ref(null)
const isLoading = ref(true)

const tasks = inject('tasks', [])
const loadTasks = inject('loadTasks', () => {})
const tasksPromise = inject('tasksPromise', null)

const categories = ref([
  { id: 1, name: 'Web Design', color: 'orange' },
  { id: 2, name: 'Research', color: 'green' },
  { id: 3, name: 'Copywriting', color: 'purple' },
])

const statuses = ref([
  { id: 'Без статуса', title: 'Без статуса' },
  { id: 'Нужно сделать', title: 'Нужно сделать' },
  { id: 'В работе', title: 'В работе' },
  { id: 'Тестирование', title: 'Тестирование' },
  { id: 'Готово', title: 'Готово' },
])

const formData = ref({
  title: '',
  topic: 'Web Design',
  status: 'Без статуса',
  description: '',
  date: new Date(),
})

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
      formData.value = {
        title: task.title || '',
        topic: task.topic || 'Web Design',
        status: task.status || 'Без статуса',
        description: task.description || '',
        date: task.date ? new Date(task.date) : new Date(),
      }
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

const getCategoryColor = (topic) => {
  const category = categories.value.find((cat) => cat.name === topic)
  return category ? category.color : 'orange'
}

const handleSave = async () => {
  if (!formData.value.title.trim()) {
    alert('Введите название задачи')
    return
  }

  if (!taskId.value) {
    alert('ID задачи не найден')
    return
  }

  try {
    const taskData = {
      title: formData.value.title,
      topic: formData.value.topic,
      status: formData.value.status,
      description: formData.value.description,
      date: formData.value.date.toISOString(),
    }

    await editTask(taskId.value, taskData)
    await loadTasks()
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Ошибка при сохранении задачи:', error)
    alert('Не удалось сохранить задачу: ' + error.message)
  }
}

const handleDelete = async () => {
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

const handleCancel = () => {
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
