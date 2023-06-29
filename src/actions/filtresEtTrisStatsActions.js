export const filtresEtTrisStatsActions = {
  changeOrdre,
  changeTerritoire,
  resetFiltre,
};

function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}

function changeTerritoire(territoire) {
  return { type: 'CHANGE_TERRITOIRE', territoire };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
