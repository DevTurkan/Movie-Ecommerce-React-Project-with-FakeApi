
import {http as httpLogin, httpWithoutHeader, httpVeryfied } from '../config'
import { http } from "../http";


export const verifyAuth = (args: Object):Promise<any> => {
  return new Promise((resolve, reject) => {
    httpLogin()
      .post(`${process.env.API_URL}auth/login/verify`, args)
      .then(response => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getPasswordChange = (args: Object):Promise<any> => {  
  return new Promise((resolve, reject) => {
      http.post(`${process.env.API_URL}auth/changepassword`, args)
      .then(response => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}




