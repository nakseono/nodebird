import axios from "axios";
import { all, call, fork, put, take } from "redux-saga/effects";

function* watchLogin() {
  yield take("LOG_IN_REQUEST", logIn);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post("/api/login", data);
}

//! <------------ 로그인 ------------>

function* watchLogOut() {
  yield take("LOG_IN_REQUEST", logOut);
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

//! <------------ 로그아웃 ------------>

function* watchAddPost() {
  yield take("LOG_IN_REQUEST", addPost);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

//! <------------ 글쓰기 ------------>

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]);
}
