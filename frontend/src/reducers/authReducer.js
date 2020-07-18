import { act } from "react-dom/test-utils";

import history from "../history";

const logout = (state, action) => {
  console.log("inside logout");
  return {
    ...state,
    currentUser: null,
    isAuthenticated: false,
  };
};

const login = (state, action) => {
  let currentUser = {};
  if (action.payload.success) {
    currentUser = action.payload.message.user;
  }

  console.log(action.payload);
  return {
    ...state,
    currentUser,
    isLoginAttempt: state.isLoginAttempt + 1,
    message: action.payload.message,
    isAuthenticated: action.payload.success,
  };
};
const fetchCurrentUser = (state, action) => {
  let currentUser = {};
  if (action.payload.success) {
    currentUser = action.payload.message.account || action.payload.message.user;
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
  let currentUser = null;

  if (action.payload.success === true) {
    currentUser = action.payload.message.user || action.payload.message.account;
  }

  console.log(state);

  ///add current user over here if the auth is successfull
  return {
    ...state,
    currentUser,
    isSignupAttempt: state.isSignupAttempt + 1,
    user: action.payload,
    message: action.payload.message,
    isAuthenticated: action.payload.success,
  };
};
export default (
  state = {
    isSignupAttempt: 0,
    isLoginAttempt: 0,
  },
  action
) => {
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
