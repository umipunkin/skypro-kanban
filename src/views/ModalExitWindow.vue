<template>
  <div class="pop-exit" id="popExit">
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>
        <form class="pop-exit__form" id="formExit" action="#">
          <div class="pop-exit__form-group">
            <button class="pop-exit__exit-yes _hover01" id="exitYes" @click="handleLogout">
              Да, выйти
            </button>
            <button class="pop-exit__exit-no _hover03" id="exitNo">
              <router-link is="a" to="/">Нет, остаться</router-link>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { logout } from '@/utils/auth';
import { useRouter } from 'vue-router';


const router = useRouter();

const handleLogout = () => {
  logout()
  router.push('/signin')
}
</script>
