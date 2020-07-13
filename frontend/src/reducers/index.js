import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import projectReducer from "./ProjectReducer";

const rootReducer = combineReducers({
  form: formReducer,
  projectReducer: projectReducer,
});

export default rootReducer;
