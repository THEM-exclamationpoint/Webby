import {
  getListOfUsers,
  getMessagesWithUser,
  sendNewMessage,
} from '../../../firebase/chat'
/**
 * ACTION TYPES
 */
const GET_CHAT_USERS = 'GET_CHAT_USERS'
const GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES'
const SEND_MESSAGE = 'SEND_MESSAGE'

/**
 * ACTION CREATORS
 */
const setChatUsers = (users) => {
  return {
    type: GET_CHAT_USERS,
    users,
  }
}

const setChatMessages = (messages) => {
  return {
    type: GET_CHAT_MESSAGES,
    messages,
  }
}
const sendMessage = (status) => {
  return {
    type: SEND_MESSAGE,
    status,
  }
}

/**
 * THUNK CREATORS
 */
export const getChatUsers = (uid) => {
  return async (dispatch) => {
    let users = await getListOfUsers(uid)
    dispatch(setChatUsers(users))
  }
}
export const getChatMessages = (uid1,uid2) => {
  return async (dispatch) => {
    let messages = await 
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
    default:
      return state
  }
}
