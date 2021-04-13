import { createStore } from "redux";
import { createWrapper } from ("next-redux-wrapper");

import reducer from '../reducers/index'

const configureStore = () => {
  const store = createStore(reducer);
  store.dispatch({
    type:'CHANGE_NICKNAME',
    data: 'NakSeoNo'
  })
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
