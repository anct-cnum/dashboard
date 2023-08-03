export const filtresConventionsActions = {
  changeOrdre,
  changeNom,
  changeFiltreDepartement,
  changeFiltreRegion,
  changeFiltreStatut,
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

function changeFiltreStatut(statutDossierRupture) {
  return { type: 'CHANGE_STATUT_DOSSIER_RUPTURE', statutDossierRupture };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
