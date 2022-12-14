import {getUsersFriends, addFriend, removeFriend} from '../../../firebase/friends'

/**
 * ACTION TYPES
 */
const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'

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
    return async (dispatch) => {
      try {
      let friends = await getUsersFriends(uid)
      dispatch(setFriends(friends))}
      catch(err){
        console.error(err)
      }
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
