export const filtresConventionsActions = {
  changeOrdre,
  changeNom,
  changeFiltreDepartement,
  changeFiltreRegion,
  resetFiltre,
};

function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}

function changeNom(nom) {
  return { type: 'CHANGE_NOM', nom };
}

function changeFiltreDepartement(departement) {
  return { type: 'CHANGE_DEPARTEMENT', departement };
}

function changeFiltreRegion(region) {
  return { type: 'CHANGE_REGION', region };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
