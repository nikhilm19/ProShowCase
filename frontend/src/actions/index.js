import axios from "axios";
import projects from "../apis/project";
import user from "../apis/user";
import auth from "../apis/auth";

import history from "../history";

export const imageUpload = (data) => {
  //const res = await axios.post("/createProject");
  console.log(data);
  return { type: "UPLOAD_IMAGES", payload: data };
};

export const createProject = (
  formValues,
  members,
  guide,
  implementationSnaps,
  history,
  batch
) => async (dispatch, getState) => {
  //const { userId } = getState().auth;
  console.log("action dispatched" + formValues);
  formValues.teamMembers = members;
  formValues.guide = guide;
  formValues.implementationSnaps = implementationSnaps;
  formValues.batch = batch;
  console.log("formvals", formValues);
  const res = await projects.post("/", { ...formValues });
  console.log(res);
  const data = res.data;
  const { _id } = res.data.message;

  history.push(`/project/view/${_id}`);

  dispatch({ type: "CREATE_PROJECT", payload: res.data });
};

export const signInUser = (formValues, cb, cookies) => async (
  dispatch,
  getState
) => {
  console.log("login action dispatched" + formValues);
  const res = await auth.post("/login", { ...formValues });

  console.log(history);

  console.log(res);

  const data = res.data;
  if (data.success === true) {
    localStorage.setItem("token", data.token);
  }
  cb(data);
  console.log(cookies);
  console.log("login res data", data);
  dispatch({ type: "USER_SIGN_IN", payload: res.data });
};

export const signUpUser = (formValues, cookies) => async (
  dispatch,
  getState
) => {
  console.log("signup action dispatched" + formValues);
  const res = await auth.post("/register", { ...formValues });

  const data = res.data;

  console.log("signup res data", data);

  if (data.success === true) {
    localStorage.setItem("token", data.token);
    // history.push("/profile");
  }

  // cb(data);

  dispatch({ type: "USER_SIGN_UP", payload: res.data });
};

export const getProfile = (cookies) => async (dispatch, getState) => {
  const token = localStorage.getItem("token");

  let state = getState();
  console.log(state);

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
      localStorage.removeItem("token");
    }
    const data = res.data;
    console.log("in getProfile action");
    console.log(data);
    dispatch({ type: "FETCH_CURRENT_USER", payload: data });
  } else
    dispatch({
      type: "FETCH_CURRENT_USER",
      payload: { success: null, error: "Token not found" },
    });
};

export const logOut = (cookies) => {
  console.log(cookies);
  localStorage.removeItem("token");
  cookies.remove("token");
  return {
    type: "LOGOUT_USER",
    payload: {},
  };
};

export const filterProjects = (guides, technologies, batches) => async (
  dispatch,
  getState
) => {
  console.log(guides, technologies, batches);
  let guideEmails = "";
  let technologyParam = "";
  let batchParam = "";
  guides.map((guide, i, arr) => {
    if (arr.length - 1 === i) {
      guideEmails = guideEmails.concat(guide);
    } else {
      guideEmails = guideEmails.concat(guide + ",");
    }
  });
  technologies.map((tech, i, arr) => {
    if (arr.length - 1 === i) {
      technologyParam = technologyParam.concat(tech);
    } else {
      technologyParam = technologyParam.concat(tech + ",");
    }
  });
  batches.map((batch, i, arr) => {
    if (arr.length - 1 === i) {
      batchParam = batchParam.concat(batch);
    } else {
      batchParam = batchParam.concat(batch + ",");
    }
  });

  let searchString = "/search?";
  if (guides !== null) {
    searchString += `guides=${guideEmails}`;
  }
  if (technologies !== null) {
    searchString += `&technologies=${technologyParam}`;
  }
  if (batches !== null) {
    searchString += `&batches=${batchParam}`;
  }
  const res = await projects.get(searchString);
  console.log("res", res);

  dispatch({
    type: "FILTER_PROJECTS",
    payload: res.data,
  });
};
