<script setup>
const props = defineProps({
  date: String,
})

const formatDate = () => {
  return new Date(props.date ?? '').toLocaleDateString('ru-RU')
}
</script>

<template>
  <div class="card__date">
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clip-path="url(#clip0_1_415)">
        <path
          d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
          stroke="#94A6BE"
          stroke-width="0.8"
          stroke-linejoin="round"
        />
        <path
          d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
          stroke="#94A6BE"
          stroke-width="0.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_415">
          <rect width="13" height="13" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <p>{{ formatDate(date) }}</p>
  </div>
</template>

<style scoped>
.card__date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #94a6be;
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.2px;
}

.card__date svg {
  width: 13px;
}

.card__date p {
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: #94a6be;
  letter-spacing: 0.2px;
}
</style>
