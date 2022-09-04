import {
    newDm
  } from '../../../firebase/chat'
  
  
  /**
   * ACTION TYPES
   */
  const CREATE_DM = 'CREATE_DM'
  
  /**
   * ACTION CREATORS
   */
  const setDM = (status) => {
    return {
      type: CREATE_DM,
      status,
    }
  }
  
  /**
   * THUNK CREATORS
   */
  export const sendDM = (uid1,uid2,name1,name2,content) => {
    return async (dispatch) => {
      let id = await newDm(uid1,uid2,name1,name2,content)
      dispatch(setDM(true))
    }
  }

  

  /**
   * REDUCER
   */
  export default function (state = false, action) {
    switch (action.type) {
      case CREATE_DM:
        return action.status
      default:
        return state
    }
  }
  