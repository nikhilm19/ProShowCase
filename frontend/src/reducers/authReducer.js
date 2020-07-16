import { act } from "react-dom/test-utils";

import history from "../history";

const logout = (state, action) => {
  console.log("inside logout");
  return {
    ...state,
    currentUser: {},
    isAuthenticated: false,
  };
};

const login = (state, action) => {
  let currentUser = {};
  if (action.payload.success) {
    currentUser = action.payload.message.user;
  }
  return {
    ...state,
    currentUser,
    message: action.payload.message,
    isAuthenticated: action.payload.success,
  };
};
const fetchCurrentUser = (state, action) => {
  let currentUser = {};
  if (action.payload.success) {
    history.push("/All-Projects");
    currentUser = action.payload.message.user;
  }
  return {
    ...state,
    currentUser,
    message: action.payload.message,
    authStatus: action.payload,
    isAuthenticated: action.payload.success,
  };
};
const signup = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};
export default (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGN_IN":
      return login(state, action);

    case "USER_SIGN_UP":
      return signup(state, action);

    case "FETCH_CURRENT_USER":
      return fetchCurrentUser(state, action);

    case "LOGOUT_USER":
      return logout(state, action);

    default:
      return state;
  }
};
