import type { LoginCreateData, UserCreateData, ChangePasswordPartialUpdateData } from '../../typings/api'
import { HOST } from './utils'

const API_URL = HOST

const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const body = await response.json()
    throw new Error(body?.message ?? `An error has occured: ${response.status}`)
  }

  return response.json() as Promise<LoginCreateData>
}

const create = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const body = await response.json()
    throw new Error(body?.message ?? `An error has occured: ${response.status}`)
  }

  return response.json() as Promise<UserCreateData>
}

const resetPassword = async (email: string) => {
  const response = await fetch(`${API_URL}/user/reset-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const body = await response.json()
    throw new Error(body?.message ?? `An error has occured: ${response.status}`)
  }
}

const changePassword = async (email: string, password: string, resetCode: string) => {
  const response = await fetch(`${API_URL}/user/change-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, resetCode }),
  })

  if (!response.ok) {
    const body = await response.json()
    throw new Error(body?.message ?? `An error has occured: ${response.status}`)
  }

  return response.json() as Promise<ChangePasswordPartialUpdateData>
}

export { login, create, resetPassword, changePassword }
