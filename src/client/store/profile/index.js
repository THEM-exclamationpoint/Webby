import {dispatch} from 'd3'
import {User} from '../../../firebase/models/User'
import {getUserById} from '../../../firebase/profile'

const GET_PROFILE = 'GET_PROFILE'

const fetchUserProfile = (user) => {
  return {
    type: GET_PROFILE,
    user,
  }
}

export const getUserProfile = (uid) => {
  return async (dispatch) => {
    try {
      const user = await getUserById(uid)
      dispatch(fetchUserProfile(user))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.user
    default:
      return state
  }
}
