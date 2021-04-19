import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

const changeNickname = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE: // 순전히 SSR을 위해 HYDRATE를 사용해야 하므로, 리듀서를 합쳐줄 때 index를 추가해 준 것이다.
        return {
          ...state,
          ...action.payload,
        };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
