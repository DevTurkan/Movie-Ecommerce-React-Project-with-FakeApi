import axios from 'axios'
import {LoginActionTypes} from 'store/types/login'
import store from '../../../../config/store'

export const http = () => {
  return axios.create({
    headers: {
        auth_token: localStorage.getItem('auth_token'),
    },
  })
}
export const httpVeryfied = () => {
  const instance =  axios.create({
    headers: {
        auth_token: localStorage.getItem('auth_token_verifyed')
    },
  })

  instance.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      if (error.response.status == 401) {
        localStorage.clear()
        store.dispatch({ type: LoginActionTypes.UNAUTH_USER })
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export const httpWithoutHeader = () => {
  return axios.create()
}
