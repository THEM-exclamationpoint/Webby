import {
    getUserData
  } from '../../../firebase/auth'

  const GET_USER = 'GET_USER'
  const fetchUser = (user) => {
    return {
      type: GET_USER,
      user,
    }
  }

  export const setUser = () => {
    return async (dispatch) => {
      const user = await getUserData()
      dispatch(fetchUser(user))
    }
  }

  export default function (state = {}, action) {
    switch (action.type) {
      case GET_USER:
          return action.user
      default:
        return state
    }
  }