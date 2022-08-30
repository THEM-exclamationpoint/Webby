import { getInterestsOfUser } from "../../../firebase/graph"

/* ACTION TYPES */

const GET_USER_INTERESTS = 'GET_USER_INTERESTS'

/* ACTION CREATORS */

const getUserInterests = (interests) => {
  return {
    type: GET_USER_INTERESTS,
    interests,
  }
}

/* THUNK CREATORS */

export const setUserInterests = (uid) => {
  return async (dispatch) => {
    const interests= await getInterestsOfUser(uid)
    dispatch(getUserInterests(interests))
  }
}

/* REDUCER */

export default function (state = [], action) {
  switch (action.type) {
    case GET_USER_INTERESTS:
      return action.interests
    default:
      return state
  }
}
