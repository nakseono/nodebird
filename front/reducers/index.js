import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

const changeNickName = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data: data,
  };
};

export const loginAction = (data) => {
  console.log("active loginAction");
  
  return {
    type: "LOG_IN",
    data: data,
  };
};

export const logoutAction = () => {
  console.log("active logoutAction");

  return {
    type: "LOG_OUT",
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
