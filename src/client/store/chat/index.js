import {
  getMessagesWithGroup,

} from '../../../firebase/chat'


/**
 * ACTION TYPES
 */
const GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES'


/**
 * ACTION CREATORS
 */
const setChatMessages = (messages) => {
  return {
    type: GET_CHAT_MESSAGES,
    messages,
  }
}


/**
 * THUNK CREATORS
 */
export const getChatMessages = (groupId) => {
  return (dispatch) => {
    let messages = getMessagesWithGroup(groupId)
    dispatch(setChatMessages(messages))
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CHAT_MESSAGES:
      return action.messages
    default:
      return state
  }
}
