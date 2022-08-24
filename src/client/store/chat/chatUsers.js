import {
    getListOfGroups,
  } from '../../../firebase/chat'
  
  
  /**
   * ACTION TYPES
   */
  const GET_CHAT_USERS = 'GET_CHAT_USERS'
  
  /**
   * ACTION CREATORS
   */
  const setChatUsers = (users) => {
    return {
      type: GET_CHAT_USERS,
      users,
    }
  }
  
  /**
   * THUNK CREATORS
   */
  export const getChatUsers = (uid) => {
    return async (dispatch) => {
      let users = await getListOfGroups(uid)
      dispatch(setChatUsers(users))
    }
  }
  

  /**
   * REDUCER
   */
  export default function (state = [], action) {
    switch (action.type) {
      case GET_CHAT_USERS:
        return action.users
      default:
        return state
    }
  }
  