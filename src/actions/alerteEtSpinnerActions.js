export const alerteEtSpinnerActions = {
  isLoading,
  getMessageAlerte,
  resetMessageAlerte,
};

function isLoading(isLoading) {
  return { type: 'GET_IS_LOADING', isLoading };
}

function getMessageAlerte(alerte) {
  return { type: 'GET_MESSAGE_ALERTE', alerte };
}

function resetMessageAlerte(toggle) {
  return { type: 'RESET_MESSAGE_ALERTE', toggle };
}
