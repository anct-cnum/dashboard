export const filtresEtTrisStatsActions = {
  updateOrder,
  changeDateDebut,
  changeDateFin,
  changeOrdre,
  changeTerritoire,
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

function changeTerritoire(territoire) {
  return { type: 'CHANGE_TERRITOIRE', territoire };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
