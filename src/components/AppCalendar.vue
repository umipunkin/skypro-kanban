<template>
  <div class="calendar">
    <p class="calendar__ttl subttl">Даты</p>
    <div class="calendar__block">
      <!-- Навигация -->
      <div class="calendar__nav">
        <div class="calendar__month">{{ currentMonth }} {{ currentYear }}</div>
        <div class="nav__actions">
          <div class="nav__action" @click="prevMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
              />
            </svg>
          </div>
          <div class="nav__action" @click="nextMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Дни недели -->
      <div class="calendar__days-names">
        <div
          v-for="day in weekdays"
          :key="day"
          class="calendar__day-name"
          :class="{ '-weekend-': ['сб', 'вс'].includes(day) }"
        >
          {{ day }}
        </div>
      </div>

      <!-- Ячейки календаря -->
      <div class="calendar__cells">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="getDayClasses(day)"
          @click="selectDate(day)"
        >
          {{ day ? day.getDate() : '' }}
        </div>
      </div>

      <!-- Выбранная дата -->
      <div class="calendar__period">
        <p class="calendar__p date-end">
          <span v-if="selectedDate"> Срок исполнения:{{ formatDate(selectedDate) }} </span>
          <span v-else> Выберите срок исполнения </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['change-date'])

const selectedDate = ref(new Date())


const currentDate = ref(new Date())
const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

// Вычисляемые свойства
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => {
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]
  return months[currentDate.value.getMonth()]
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days = []
  const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const daysInMonth = lastDay.getDate()

  // Добавляем пустые ячейки для дней предыдущего месяца
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }

  // Добавляем дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  return days
})

// Методы
const getDayClasses = (day) => {
  if (!day) return 'calendar__cell _other-month'
  
  const classes = ['calendar__cell', '_cell-day']
  const today = new Date()
  
  if (day.getMonth() !== currentDate.value.getMonth()) {
    classes.push('_other-month')
  }
  
  if (day.getDay() === 0 || day.getDay() === 6) {
    classes.push('_weekend')
  }
  
  if (day.toDateString() === today.toDateString()) {
    classes.push('_current', '_today-bold') // Добавляем класс для жирного шрифта
  }
  
  if (selectedDate.value && day.toDateString() === selectedDate.value.toDateString()) {
    classes.push('_selected')
  }
  
  return classes.join(' ')
}

const selectDate = (day) => {
  if (day && day.getMonth() === currentDate.value.getMonth()) {
    selectedDate.value = day
    emit('change-date', day)
  }
}

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const formatDate = (date) => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>

<style scoped>

.calendar__cell {
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar__cell:hover {
  background-color: #f0f0f0;
}

.calendar__cell._selected {
  background-color: #94a6be;
  color: white;
}

.calendar__cell._current {
  border: 2px solid #94a6be;
}

.calendar__cell._weekend {
  color: #ff3333;
}
</style>
