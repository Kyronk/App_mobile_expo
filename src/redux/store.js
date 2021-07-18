import { createStore } from "redux";

//all reducers
import { allReducers } from "./reducer";

export const store = createStore(allReducers);
