import axios from "axios";
import projects from "../apis/project";
import history from "../history";

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
