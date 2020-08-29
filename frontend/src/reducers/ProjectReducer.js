const setFileUploadedData = (state, action) => {
  return {
    ...state,
    implementationSnaps: action.payload,
  };
};
const uploadProjectData = (state, action) => {
  return {
    ...state,
    message: action.payload.message,
    projectData: action.payload.message,
    success: action.payload.success,
  };
};
const filterProjectsData = (state, action) => {
  console.log(action.payload.projects);
  return {
    ...state,
    success: action.payload.success,
    message: action.payload.success
      ? action.payload.projects
      : action.payload.message,
  };
};
export default (state = {}, action) => {
  switch (action.type) {
    case "UPLOAD_IMAGES":
      return setFileUploadedData(state, action);

    case "CREATE_PROJECT":
      return uploadProjectData(state, action);
    case "FILTER_PROJECTS":
      return filterProjectsData(state, action);
    default:
      return state;
  }
};
