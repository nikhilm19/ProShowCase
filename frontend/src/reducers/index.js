import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import projectReducer from "./ProjectReducer";
import authReducer from "./authReducer";
const rootReducer = combineReducers({
  form: formReducer,
  projectReducer,
  authReducer,
});

export default rootReducer;
