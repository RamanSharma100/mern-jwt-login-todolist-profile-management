import * as types from "../actionTypes/authActionTypes";
const initialState = {
  isAuthenticated: false,
  user: {},
  token: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
      };
    default:
      return state;
  }
};

export default authReducer;
