export const filtresConventionsActions = {
  changeOrdre,
  changeNom,
  resetFiltre,
};

function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}

function changeNom(nom) {
  return { type: 'CHANGE_NOM', nom };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
