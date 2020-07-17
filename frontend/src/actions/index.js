import axios from "axios";
import projects from "../apis/project";
import user from "../apis/user";
import auth from "../apis/auth";

import history from "../history";
import { withCookies, Cookies } from "react-cookie";
import cookie from "react-cookie";

export const imageUpload = (data) => {
  //const res = await axios.post("/createProject");
  console.log(data);
  return { type: "UPLOAD_IMAGES", payload: data };
};

export const createProject = (formValues, members, guide) => async (
  dispatch,
  getState
) => {
  //const { userId } = getState().auth;
  console.log("action dispatched" + formValues);
  formValues.teamMembers = members;
  formValues.guide = guide;
  console.log("formvals" + JSON.stringify(formValues));
  const res = await projects.post("/", { ...formValues });
  console.log(res);
  const data = res.data;
  const { _id } = res.data;

  history.push(`project/view/${_id}`);

  dispatch({ type: "CREATE_PROJECT", payload: res.data });
};

export const signInUser = (formValues, cookies) => async (
  dispatch,
  getState
) => {
  console.log("login action dispatched" + formValues);
  const res = await auth.post("/login", { ...formValues });

  const data = res.data;
  console.log(cookies);

  console.log("login res data" + JSON.stringify(data));
  //console.log(cookies.get("token"));

  dispatch({ type: "USER_SIGN_IN", payload: res.data });
};

export const signUpUser = (formValues, cookies) => async (
  dispatch,
  getState
) => {
  console.log("signup action dispatched" + formValues);
  const res = await auth.post("/register", { ...formValues });

  const data = res.data;

  console.log("signup res data" + data);

  if (data.success === true) {
    history.push("/profile");
  }

  dispatch({ type: "USER_SIGN_UP", payload: res.data });
};

export const getProfile = (cookies) => async (dispatch, getState) => {
  const token = cookies.get("token");
  if (token) {
    const res = await user.get("/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.statusCode === 401) {
      cookies.remove("token");
    }
    const data = res.data;

    console.log("in getProfile action");
    console.log(data);
    if (data) {
      // An error will occur if the token is invalid.
      // If this happens, you may want to remove the invalid token.

      console.log(data);

      dispatch({ type: "FETCH_CURRENT_USER", payload: data });
    }
  }
};

export const logOut = (cookies) => {
  console.log(cookies);

  cookies.remove("token");
  return {
    type: "LOGOUT_USER",
    payload: {},
  };
};
