import { getUser } from '@/utils/auth'
import axios from 'axios'

const user = getUser()

const API_URL = 'https://wedev-api.sky.pro/api'
let authHeader = user ? `Bearer ${user.token}` : ''

export async function fetchTasks() {
  try {
    const response = await axios.get(`${API_URL}/kanban`, {
      headers: {
        Authorization: authHeader,
      },
    })

    return response.data.tasks
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function createTask(task) {
  try {
    const data = await axios.post(`${API_URL}/kanban`, task, {
      headers: {
        Authorization: authHeader,
        'Content-Type': '',
      },
    })

    return data.data.tasks
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function editTask(id, task) {
  try {
    const response = await axios.put(`${API_URL}/kanban/${id}`, task, {
      headers: {
        Authorization: authHeader,
        'Content-Type': '',
      },
    })
    return response.data
  } catch (error) {
    console.error('API Edit - Error:', error.response?.data || error.message)
    throw new Error(error.response?.data?.error || error.message)
  }
}

export async function signIn(userData) {
  try {
    const data = await axios.post(`${API_URL}/user/login`, userData, {
      headers: {
        'Content-Type': '',
      },
    })
    authHeader = `Bearer ${data.data?.user?.token}`
    return data.data.user
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export async function signUp({ name, login, password }) {
  try {
    const data = await axios.post(
      `${API_URL}/user`,
      { login, name, password },
      {
        headers: {
          'Content-Type': '',
        },
      },
    )
    return data.data.user
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${API_URL}/kanban/${id}`, {
      headers: {
        Authorization: authHeader,
      },
    })
    return response.data
  } catch (error) {
    console.error('API Delete - Error:', error.response?.data || error.message)
    throw new Error(error.response?.data?.error || error.message)
  }
}
