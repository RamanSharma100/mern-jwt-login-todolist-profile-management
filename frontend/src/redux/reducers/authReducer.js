const initialState = {
  isAuthenticated: false,
  user: {},
  token: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default authReducer;
