import {auth} from '../../../firebase/auth'
import {User} from '../../../firebase/models/User'
import {getUserById} from '../../../firebase/profile'
import {getAllInterests} from '../../../firebase/profile'

const UPDATE_PROFILE = 'UPDATE_PROFILE'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_EMAIL = 'UPDATE_EMAIL'

const GET_ALL_INTERESTS = 'GET_ALL_INTERESTS'

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

const setAllInterests = (interests) => {
  return {
    type: GET_ALL_INTERESTS,
    interests,
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

export const fetchAllInterests = () => {
  return async (dispatch) => {
    const interests = await getAllInterests()
    dispatch(setAllInterests(await interests.map((item) => item.interest)))
  }
}

function initState() {
  return {
    user: new User(auth.currentUser),
    interests: [],
  }
}

export default function (state = initState(), action) {
  let updState = {...state}
  switch (action.type) {
    case GET_ALL_INTERESTS:
      updState.interests = [...action.interests]
      return updState
    case UPDATE_EMAIL:
      return state
    case UPDATE_PASSWORD:
      return state
    case UPDATE_PROFILE:
      updState.user = new User(action.user)
      return updState
    default:
      return state
  }
}
