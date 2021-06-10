import { all, delay, put } from "redux-saga/effects";
import axios from "axios";

function* watchAddPost() {
  yield takeLatest("LOG_IN_REQUEST", addPost);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      // data: result.data,
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

export default function* postSaga() {
  yield all([watchAddPost]);
}
