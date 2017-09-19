export const errorTransform = (error, messages) => {

  if (error.response && error.response.status === 400) {
    return error.response.data;
  } else if (error.response) {
    return { serverError: messages[error.response.status] || error.response.statusText };
  } else {
    return { serverError: error.message };
  }

};
