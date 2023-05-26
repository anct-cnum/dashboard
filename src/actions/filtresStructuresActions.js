export const filtresStructuresActions = {
  changeOrdre,
  changeNomStructure,
  saveSearchInput,
  changeFiltreRegion,
  changeFiltreType,
  changeFiltreDepartement,
  changeFiltreStatut,
  resetFiltre,
};
  
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
