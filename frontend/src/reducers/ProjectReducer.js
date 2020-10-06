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

const postComment = (state, action) => {
  return {
    ...state,
    success: action.payload.success,
    comment: action.payload.success === true ? action.payload.comment : null,
    error: action.payload.success === false ? action.payload.error : null,
  };
};

const getComments = (state, action) => {
  return {
    ...state,
    success: action.payload.success,
    comments: action.payload.success === true ? action.payload.comments : null,
    error: action.payload.success === false ? action.payload.error : null,
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

    case "POST_COMMENT":
      return postComment(state, action);

    case "GET_COMMENTS":
      return getComments(state, action);
    default:
      return state;
  }
};
