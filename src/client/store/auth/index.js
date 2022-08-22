import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  logout,
  getUserData
} from '../../../firebase/auth'
/**
 * ACTION TYPES
 */
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

/**
 * ACTION CREATORS
 */
const _logIn = (status) => {
  return {
    type: LOG_IN,
    status,
  }
}
const _logOut = (status) => {
  return {
    type: LOG_OUT,
    status,
  }
}


/**
 * THUNK CREATORS
 */
export const logIn = (email,password) => {
  return async (dispatch) => {
    await logInWithEmailAndPassword(email,password)
    dispatch(_logIn(true))
  }
}
export const logInGoogle = () => {
  return async (dispatch) => {
    await signInWithGoogle()
    dispatch(_logIn(true))
  }
}
export const logOutUser = () => {
  return async (dispatch) => {
    await logout()
    dispatch(_logOut(false))
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case LOG_IN:
      return action.status
    case LOG_OUT:
      return action.status
    default:
      return state
  }
}
