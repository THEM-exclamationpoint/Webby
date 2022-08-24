import {
  getMessagesWithGroup,
  sendNewMessage,
} from '../../../firebase/chat'


/**
 * ACTION TYPES
 */
const GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES'
const SEND_MESSAGE = 'SEND_MESSAGE'

/**
 * ACTION CREATORS
 */
const setChatMessages = (messages) => {
  return {
    type: GET_CHAT_MESSAGES,
    messages,
  }
}
const sendMessage = (messages) => {
  return {
    type: SEND_MESSAGE,
    messages,
  }
}

/**
 * THUNK CREATORS
 */
export const getChatMessages = (groupId) => {
  return async (dispatch) => {
    let messages = await getMessagesWithUser(groupId)
    dispatch(setChatMessages(messages))
  }
}
export const sentMessage = (groupId, content) => {
  return async (dispatch) => {
    await sendNewMessage(groupId,content)
    let messages = await getMessagesWithUser(groupId)
    dispatch(sendMessage(messages))
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CHAT_MESSAGES:
      return action.messages
    case SEND_MESSAGE:
      return action.messages
    default:
      return state
  }
}
