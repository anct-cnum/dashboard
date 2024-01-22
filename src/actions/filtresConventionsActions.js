export const filtresConventionsActions = {
  changeOrdre,
  changeNom,
  changeFiltreDepartement,
  changeFiltreRegion,
  changeFiltreStatut,
  changeFiltreAvisANCT,
  changeFiltreAvisPrefet,
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

function changeFiltreAvisANCT(avisANCT) {
  return { type: 'CHANGE_AVIS_ANCT_CANDIDATURE', avisANCT };
}

function changeFiltreAvisPrefet(avisPrefet) {
  return { type: 'CHANGE_AVIS_PREFET', avisPrefet };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
