export const filtresGestionnairesActions = {
  updateOrder,
  changeOrdre,
  changeNomGestionnaire,
  saveSearchInput,
  changeFiltreRole,
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

function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}

function changeNomGestionnaire(nomGestionnaire) {
  return { type: 'CHANGE_NOM_GESTIONNAIRE', nomGestionnaire };
}
  
function saveSearchInput(searchInput) {
  return { type: 'SAVE_SEARCH_INPUT', searchInput };
}
  
function changeFiltreRole(role) {
  return { type: 'CHANGE_SEARCH_ROLE', role };
}
  
function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
