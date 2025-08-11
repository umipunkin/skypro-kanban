import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import AddTaskView from '@/views/AddTaskView.vue'
import EditTaskView from '@/views/EditTaskView.vue'
import ViewTaskView from '@/views/ViewTaskView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ModalExitWindow from '@/views/ModalExitWindow.vue'

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { requiresAuth: false }
    },
    {
      path: '/tasks/add',
      name: 'add-task',
      component: AddTaskView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks/:id/edit',
      name: 'edit-task',
      component: EditTaskView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/tasks/:id',
      name: 'view-task',
      component: ViewTaskView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/exit',
      name: 'exit',
      component: ModalExitWindow,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'signin' })
  } else if ((to.name === 'signin' || to.name === 'signup') && isAuthenticated()) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router