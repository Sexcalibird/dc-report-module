import { call, put, takeLatest } from "redux-saga/effects";

import { login } from "../../services";
import { doLogin, updateUser } from "../slices/auth.slice";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
}

export function* handleLogin(action) {
  try {
    const info = action.payload;

    const req = {
      partner_code: info.partner_code,
      NHANSU_ID: info.nhansu_id,
      PASSWORD: info.password,
    };

    
    const res = yield call(() => login(req));
    console.log("dấdas", res);

    if (res.status === "OK") {
      const { user, partner_code, config } = res;
      const { module } = info;

      yield put(updateUser({ ...user, partner_code, config, module }));
    } else {
      throw JSON.stringify(res);
    }
  } catch (error) {
    console.log(error);
  }
}
