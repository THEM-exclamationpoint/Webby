const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const _logIn = (status) => {
  return {
    type: LOG_IN,
    status,
  };
};

const _logOut = (status) => {
  return {
    type: LOG_OUT,
    status,
  };
};

export const logIn = () => {
  return async (dispatch) => {
    dispatch(_logIn(true));
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch(_logOut(false));
  };
};

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.status;
    case LOG_OUT:
      return action.status;
    default:
      return state;
  }
};

export default statusReducer;
