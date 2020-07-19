const setFileUploadedData = (state, action) => {
  return {
    ...state,
    implementationSnaps: action.payload,
  };
};
const uploadProjectData = (state, action) => {
  return {
    ...state,
    projectData: action.payload,
  };
};
export default (state = {}, action) => {
  switch (action.type) {
    case "UPLOAD_IMAGES":
      return setFileUploadedData(state, action);

    case "CREATE_PROJECT":
      return uploadProjectData(state, action);

    default:
      return state;
  }
};
