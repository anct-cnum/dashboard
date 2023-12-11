export function handleApiError(error) {
  if (error.response && error.response.data && error.response.data.message) {
    return Promise.reject(error.response.data.message);
  } else if (error.message) {
    return Promise.reject(error.message);
  } else {
    return Promise.reject('Une erreur inconnue s\'est produite');
  }
}
