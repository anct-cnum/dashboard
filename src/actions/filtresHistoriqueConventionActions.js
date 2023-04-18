export const filtresGestionnairesActions = {
  changeDateDebut,
  changeDateFin,
  resetFiltre,
};
  
function changeDateDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT', dateDebut };
}
    
function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN', dateFin };
}
    
function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
  
