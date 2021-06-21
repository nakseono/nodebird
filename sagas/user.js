import { all, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
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
  yield takeLatest("LOG_IN_REQUEST", logOut);
}

function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      // data: result.data,
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

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
