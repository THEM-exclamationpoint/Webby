import {
    getListOfGroups,
    addToGroup,
    newGroup,
    changeGroupName,
    removeFromGroup
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
  export const addChatUsers = (uid1,uid2,groupId) => {
    return async (dispatch) => {
      await addToGroup(uid1,groupId)
      let users = await getListOfGroups(uid2)
      dispatch(setChatUsers(users))
    }
  }
  export const removeChatUsers = (uid1,uid2,groupId) => {
    return async (dispatch) => {
      await removeFromGroup(uid1,groupId)
      let users = await getListOfGroups(uid2)
      dispatch(setChatUsers(users))
    }
  }
  export const addNewChat = (uids,groupname,uid) => {
    return async (dispatch) => {
      await newGroup(uids,groupname)
      let users = await getListOfGroups(uid)
      dispatch(setChatUsers(users))
    }
  }
  
  export const editGroupName = (newName,groupId,uid) => {
    return async (dispatch) => {
      await changeGroupName(newName,groupId)
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
  