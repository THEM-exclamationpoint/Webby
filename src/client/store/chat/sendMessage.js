import {
    sendNewMessage
  } from '../../../firebase/chat'
  
  
  /**
   * ACTION TYPES
   */
  const SEND_MESSAGE = 'SEND_MESSAGE'
  
  /**
   * ACTION CREATORS
   */
  const sendMessage = (status) => {
    return {
      type: SEND_MESSAGE,
      status,
    }
  }
  
  /**
   * THUNK CREATORS
   */
  export const sentMessage = (uid,groupId, content) => {
    return async (dispatch) => {
      await sendNewMessage(uid,groupId,content)
      dispatch(sendMessage(true))
    }
  }
  /**
   * REDUCER
   */
  export default function (state = false, action) {
    switch (action.type) {
      case SEND_MESSAGE:
        return action.status
      default:
        return state
    }
  }
  