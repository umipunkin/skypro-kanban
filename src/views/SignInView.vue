<template>
  <div class="auth-container">
    <div class="auth-form">
      <h1 class="auth-title">Вход</h1>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-input"
            required
            placeholder="Эл. почта"
          >
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-input"
            required
            placeholder="Пароль"
          >
          <span class="error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <button type="submit" class="auth-button _hover01" :disabled="isSubmitting">
          {{ isSubmitting ? 'Вход...' : 'Войти' }}
        </button>

        <p class="auth-link">
          Нужно зарегистрироваться? <router-link to="/signup"><br>Регистрируйтесь здесь</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/utils/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const errors = ref({})
const isSubmitting = ref(false)

const validate = () => {
  errors.value = {}
  let isValid = true

  if (!email.value) {
    errors.value.email = 'Email обязателен'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = 'Введите корректный email'
    isValid = false
  }

  if (!password.value) {
    errors.value.password = 'Пароль обязателен'
    isValid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Пароль должен быть не менее 6 символов'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true

  try {
    const mockToken = 'mock-auth-token'
    login(mockToken)
    
    router.push('/')
  } catch (error) {
    errors.value.general = error.message || 'Ошибка входа'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #EAEEF6;
  padding: 20px;
}

.auth-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-title {
  text-align: center;
  margin-bottom: 30px;
  color: #000;
  font-size: 24px;
}


.form-group:nth-child(n+2) {
  margin-top: 7px;
}


.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #D4DBE5;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #565EEF;
  outline: none;
}

.error {
  color: #FF6D00;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.auth-button {
  width: 100%;
  padding: 12px;
  background-color: #565EEF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.auth-button:disabled {
  background-color: #94A6BE;
  cursor: not-allowed;
}

.auth-link {
  text-align: center;
  margin-top: 20px;
  color: #94A6BE;
  font-size: 14px;
}

.auth-link a {
  color: #94A6BE;
  text-decoration-line: underline;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>