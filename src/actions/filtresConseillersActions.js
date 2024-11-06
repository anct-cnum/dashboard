export const filtresConseillersActions = {
  changeOrdre,
  changeNomStructure,
  saveSearchInput,
  changeFiltreRegion,
  changeProfil,
  changeCertifie,
  changeNomConseiller,
  changeCoordinateur,
  changeRupture,
  changeFiltreDepartement,
  resetFiltre,
};
  
function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}
  
function changeProfil(dataProfil) {
  return { type: 'CHANGE_PROFIL', dataProfil };
}
  
function changeCertifie(dataCertifie) {
  return { type: 'CHANGE_CERTIFIE', dataCertifie };
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

function changeFiltreDepartement(departement) {
  return { type: 'CHANGE_DEPARTEMENT', departement };
}
  
function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
