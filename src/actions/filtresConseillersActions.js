export const filtresConseillersActions = {
  changeDateDebut,
  changeDateFin,
  changeOrdre,
  changeNomStructure,
  saveSearchInput,
  changeFiltreRegion,
  changeProfil,
  changeCertifie,
  changeGroupeCRA,
  changeNomConseiller,
  changeCoordinateur,
  changeRupture,
  resetFiltre,
};

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

function changeCoordinateur(dataCoordinateur) {
  return { type: 'CHANGE_COORDINATEUR', dataCoordinateur };
}
  
function changeRupture(dataRupture) {
  return { type: 'CHANGE_RUPTURE', dataRupture };
}
  
function saveSearchInput(searchInput, region) {
  return { type: 'SAVE_SEARCH_INPUT', searchInput, region };
}
  
function changeFiltreRegion(region) {
  return { type: 'CHANGE_REGION', region };
}
  
function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
