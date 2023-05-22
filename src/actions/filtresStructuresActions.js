export const filtresStructuresActions = {
  changeDateDebut,
  changeDateFin,
  changeOrdre,
  changeNomStructure,
  saveSearchInput,
  changeFiltreRegion,
  changeFiltreType,
  changeFiltreDepartement,
  changeFiltreStatut,
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

function changeNomStructure(nomStructure) {
  return { type: 'CHANGE_NOM_STRUCTURE', nomStructure };
}
  
function changeFiltreType(typeStructure) {
  return { type: 'CHANGE_TYPE', typeStructure };
}
  
function changeFiltreStatut(statut) {
  return { type: 'CHANGE_STATUT', statut };
}
  
function changeFiltreDepartement(departement) {
  return { type: 'CHANGE_DEPARTEMENT', departement };
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
