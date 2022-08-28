

const UPDATE_PROFILE = 'UPDATE_PROFILE';

const _updateProfile = (user) => {
  return {
    type: UPDATE_PROFILE,
    user
  }
}


export default function (state={}, action) {
  switch (action.type) {
    default:
      return state
  }
}