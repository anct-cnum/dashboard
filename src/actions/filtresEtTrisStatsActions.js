export const filtresEtTrisStatsActions = {
  updateOrder,
  changeDateDebut,
  changeDateFin,
  changeOrdre,
  changeProfil,
  changeCertifie,
  changeTerritoire,
  changeGroupeCRA,
  changeNomConseiller,
  changeNomStructure,
  saveSearchInput,
  changeFiltreRegion,
  changeCoordinateur,
  changeRupture,
  resetFiltre,
};

function updateOrder(order) {
  return dispatch => {
    dispatch(success(order));
  };

  function success(order) {
    return { type: 'UPDATE_ORDER', order };
  }
}

function changeDateDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT', dateDebut };
}

function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN', dateFin };
}

function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}

function changeProfil(dataProfil) {
  return { type: 'CHANGE_PROFIL', dataProfil };
}

function changeCertifie(dataCertifie) {
  return { type: 'CHANGE_CERTIFIE', dataCertifie };
}

function changeGroupeCRA(dataGroupeCRA) {
  return { type: 'CHANGE_GROUPE_CRA', dataGroupeCRA };
}

function changeNomConseiller(nomConseiller) {
  return { type: 'CHANGE_NOM_CONSEILLER', nomConseiller };
}

function changeNomStructure(nomStructure) {
  return { type: 'CHANGE_NOM_STRUCTURE', nomStructure };
}

function changeTerritoire(territoire) {
  return { type: 'CHANGE_TERRITOIRE', territoire };
}

function saveSearchInput(searchInput, region) {
  return { type: 'SAVE_SEARCH_INPUT', searchInput, region };
}

function changeFiltreRegion(region) {
  return { type: 'CHANGE_REGION', region };
}

function changeCoordinateur(dataCoordinateur) {
  return { type: 'CHANGE_COORDINATEUR', dataCoordinateur };
}

function changeRupture(dataRupture) {
  return { type: 'CHANGE_RUPTURE', dataRupture };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
