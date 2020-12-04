export const initialState = {
  isLoggedIn: false,
  user: null,
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
        user: action.data,
      };
    case "LOG_OUT":
      return {
        ...state.user, // 참조관계 유지
        isLoggedIn: false,
        user: null,
      };
  }
};

export default reducer;
