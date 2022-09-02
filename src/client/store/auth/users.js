import {getUsersById} from '../../../firebase/chat'
import {getAllUsers} from '../../../firebase/friends'

const GET_USERS = 'GET_USERS'

const fetchUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  }
}

export const setUsers = (uids) => {
  return (dispatch) => {
    try {
      const users = getUsersById(uids)
      dispatch(fetchUsers(users))
    } catch (err) {
      console.error(err)
    }
  }
}
export const setAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await getAllUsers()
      dispatch(fetchUsers(users))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
