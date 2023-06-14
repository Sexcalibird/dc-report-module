import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import { authSlice } from "./slices";


const reducer = combineReducers({
  auth: authSlice,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }),
sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);
