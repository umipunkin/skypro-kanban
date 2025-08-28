<template>
  <div class="auth-container">
    <div class="auth-form">
      <h1 class="auth-title">Регистрация</h1>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <input
            v-model="name"
            type="text"
            id="name"
            class="form-input"
            required
            placeholder="Имя"
          >
          <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>

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

        <span class="error" v-if="errors.general">{{ errors.general }}</span>


        <button type="submit" class="auth-button _hover01" :disabled="isSubmitting">
          {{ isSubmitting ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>

        <p class="auth-link">
          Уже есть аккаунт? <router-link to="/signin">Войдите здесь</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/utils/auth'
import { signUp } from '@/assets/services/api'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref({})
const isSubmitting = ref(false)

const validate = () => {
  errors.value = {}
  let isValid = true

  if (!name.value) {
    errors.value.name = 'Имя обязательно'
    isValid = false
  }

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

  errors.value = {}

  isSubmitting.value = true

  try {
    const userData = {
      name: name.value,
      login: email.value,
      password: password.value
    }
    // login(mockToken, userData)

    const res = await signUp(userData)

    login(res.token, res)
    
    router.push('/')
  } catch (error) {
    errors.value.general = error.message || 'Ошибка регистрации'
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

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #000;
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
  border-color:  #D4DBE5;
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
  margin-top: 10px;
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
  text-decoration: underline;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>