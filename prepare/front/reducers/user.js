export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case "LOG_IN":
      return {
        ...state.user, // 참조관계 유지
        isLoggedIn: true,
        me: action.data,
      };
    case "LOG_OUT":
      return {
        ...state.user, // 참조관계 유지
        isLoggedIn: false,
        me: null,
      };
  }
};

export default reducer;
