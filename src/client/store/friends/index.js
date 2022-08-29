import {getUsersFriends} from '../../../firebase/friends'

/**
 * ACTION TYPES
 */
const GET_FRIENDS = 'GET_FRIENDS'

/**
 * ACTION CREATORS
 */
const setFriends = (friends) => {
  return {
    type: GET_FRIENDS,
    friends,
  }
}

/**
 * THUNK CREATORS
 */
export const getFriends = (uid) => {
  try {
    return async (dispatch) => {
      let friends = await getUsersFriends(uid)
      dispatch(setFriends(friends))
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    default:
      return state
  }
}
