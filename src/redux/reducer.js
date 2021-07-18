import { combineReducers } from "redux";

//child reducer
import userReducer from "./reducers/user";
import loadingReducer from "./reducers/loading";
import expoReducer from "./reducers/expo";

export const allReducers = combineReducers({
  userReducer,
  loadingReducer,
  expoReducer,
});
