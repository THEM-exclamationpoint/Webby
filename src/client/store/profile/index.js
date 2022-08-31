import {dispatch} from 'd3'
import {User} from '../../../firebase/models/User'
import {getUserById} from '../../../firebase/profile'

const GET_PROFILE = 'GET_PROFILE'
const GET_INTERESTS = 'GET_INTERESTS'
const GET_FRIENDS = 'GET_FRIENDS'

const fetchUserProfile = (user) => {
  return {
    type: GET_PROFILE,
    user,
  }
}

const fetchUserFriends = (friends) => {
  return {
    type: GET_FRIENDS,
    friends,
  }
}

const fetchUserInterests = (interests) => {
  return {
    type: GET_INTERESTS,
    interests,
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
export const getUserFriends = (uid) => {
  return async (dispatch) => {
    try {
      const user = await getUserById(uid)
      const util = new User(user)
      const friends = await util.myFriends()
      dispatch(fetchUserFriends(friends))
    } catch (err) {
      console.error(err)
    }
  }
}
export const getUserInterests = (uid) => {
  return async (dispatch) => {
    try {
      const user = await getUserById(uid)
      const util = new User(user)
      const interests = await util.myInterests()
      dispatch(fetchUserInterests(interests))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function (
  state = {user: {}, friends: [], interests: []},
  action
) {
  let updState = {...state}
  switch (action.type) {
    case GET_PROFILE:
      updState.user = {...action.user}
      return updState
    case GET_FRIENDS:
      updState.friends = [...action.friends]
      return updState
    case GET_INTERESTS:
      updState.interests = [...action.interests]
      return updState
    default:
      return state
  }
}
