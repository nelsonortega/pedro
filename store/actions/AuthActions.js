import FirebaseKey from '../../constants/FirebaseKey'

import { AsyncStorage } from 'react-native'

export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token }
}

export const register = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FirebaseKey.FirebaseConfig.apiKey,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )
  
    if (!response.ok) {
      const errorResponse = await response.json()
      const error = errorResponse.error.message
      const message = 'Algo salio mal'

      throw new Error(error);
    }
  
    const responseData = await response.json()
    dispatch({ type: AUTHENTICATE, token: responseData.idToken, userId: responseData.localId })
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + FirebaseKey.FirebaseConfig.apiKey,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )
  
    if (!response.ok) {
      const errorResponse = await response.json()
      const error = errorResponse.error.message
      const message = 'Algo salio mal'

      throw new Error(error);
    }
  
    const responseData = await response.json()
    dispatch({ type: AUTHENTICATE, token: responseData.idToken, userId: responseData.localId })
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const logout = () => {
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expirationDate: expirationDate.toISOString()
  }))
}