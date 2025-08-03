<template>
  <a href="#popBrowse" target="_self">
    <div class="card__btn">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </a>
</template>

<script setup>
</script>

<style scoped>
.card__btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.card__btn:hover {
  opacity: 0.7;
}

.card__btn div {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #94A6BE;
  transition: background-color 0.2s ease;
}


.card__btn:hover div {
  background-color: #565EEF;
}
</style>