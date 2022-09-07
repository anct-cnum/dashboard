export const alerteEtSpinnerActions = {
  resetMessageAlerte,
};

function resetMessageAlerte(toggle) {
  return { type: 'RESET_MESSAGE_ALERTE', toggle };
}
