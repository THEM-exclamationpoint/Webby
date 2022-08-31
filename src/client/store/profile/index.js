import {User} from '../../../firebase/models/User'
import {getUserData} from '../../../firebase/auth'

const UPDATE_PROFILE = 'UPDATE_PROFILE'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_EMAIL = 'UPDATE_EMAIL'

const _updateProfile = (user) => {
  return {
    type: UPDATE_PROFILE,
    user,
  }
}

const _updatePassword = () => {
  return {
    type: UPDATE_PASSWORD,
  }
}

const _updateEmail = () => {
  return {
    type: UPDATE_EMAIL,
  }
}

export const updateProfile = (user) => {
  return async (dispatch) => {
    console.log(user)
    await user.updateMyProfile()
    dispatch(_updateProfile(user))
  }
}

export const updatePassword = (user, passwords) => {
  return async (dispatch) => {
    if (passwords.new !== '' && passwords.new === passwords.confirm) {
      user.updateMyPassword(passwords.new)
      dispatch(_updatePassword)
    }
  }
}

export const updateEmail = (user, email) => {
  return async (dispatch) => {
    if (email.new !== '' && email.new === email.confirm) {
      user.updateMyEmail(email.new)
      dispatch(_updateEmail)
    }
  }
}

export default function (state = new User(getUserData()), action) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return state
    case UPDATE_PASSWORD:
      return state
    case UPDATE_PROFILE:
      return new User(action.user)
    default:
      return state
  }
}
