import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  logout,
} from '../../../firebase/auth'
/**
 * ACTION TYPES
 */
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const SIGN_UP = 'SIGN_UP'

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

const signUp= (status) => {
  return {
    type: SIGN_UP,
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
    let isNew = await signInWithGoogle()
    dispatch(_logIn(isNew))
  }
}
export const logOutUser = () => {
  return async (dispatch) => {
    await logout()
    dispatch(_logOut(false))
  }
}
export const signUpUser = (name,email,password) => {
  return async (dispatch) => {
    await registerWithEmailAndPassword(name,email,password)
    dispatch(signUp(true))
  }
}

/**
 * REDUCER
 */
export default function (state = false, action) {
  switch (action.type) {
    case LOG_IN:
      return action.status
    case LOG_OUT:
      return action.status
    case SIGN_UP:
      return action.status
    default:
      return state
  }
}
