import { applyMiddleware, compose, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleWare from "redux-saga";

import reducer from "../reducers";
import rootSaga from "../sagas";

const configureStore = () => {
  const sagaMiddleWare = createSagaMiddleWare();
  const middlewares = [sagaMiddleWare];

  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleWare.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
