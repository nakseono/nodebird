import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "../reducers/user";
import post from "../reducers/post";

// (이전상태, 액션) -(디스패치)> 다음 상태
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
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
