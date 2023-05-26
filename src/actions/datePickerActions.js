export const datePickerActions = {
  changeDateDebut,
  changeDateFin,
  resetDatePicker,
};

function changeDateDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT', dateDebut };
}
    
function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN', dateFin };
}

function resetDatePicker() {
  return { type: 'RESET_DATE_PICKER' };
}
