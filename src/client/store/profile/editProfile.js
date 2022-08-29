const UPDATE_PROFILE = 'UPDATE_PROFILE'

const _updateProfile = (user) => {
  return {
    type: UPDATE_PROFILE,
    user,
  }
}

export const updateProfile = (uid, profile) => {
  return async (dispatch) => {}
}

export default function (state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}
