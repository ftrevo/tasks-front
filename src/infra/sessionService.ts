import { LoginCreateData } from '../../typings/api'

const TOKEN_KEY = 'jwtToken'
const NAME_KEY = 'name'
const ID_KEY = 'id'

const setData = (data: LoginCreateData) => {
  sessionStorage.setItem(TOKEN_KEY, data.token)
  sessionStorage.setItem(NAME_KEY, data.name)
  sessionStorage.setItem(ID_KEY, `${data.id}`)
}

const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY)
}

const getName = () => {
  return sessionStorage.getItem(NAME_KEY)
}

const getId = () => {
  return sessionStorage.getItem(ID_KEY)
}

const cleanSession = () => {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(NAME_KEY)
  sessionStorage.removeItem(ID_KEY)
}

const isAuthenticated = () => {
  return getToken() !== null
}

export { setData, getToken, getName, getId, cleanSession, isAuthenticated }
