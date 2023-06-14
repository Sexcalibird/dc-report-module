import { all, fork } from "redux-saga/effects";
import { watchDoAuth } from "./authSagas";

// import { watchDoAuth } from "./authSagas";

export default function* rootSaga() {
  yield all([fork(watchDoAuth)]);
}