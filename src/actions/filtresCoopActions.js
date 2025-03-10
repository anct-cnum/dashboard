export const filtresCoopActions = {
  changeDateDebut,
  changeDateFin,
  changeTypes,
  changeMediateurs,
  changeDepartements,
  changesearchNomEtOuPrenomConseiller
};

function changeDateDebut(dateDebutCoop) {
  return { type: 'CHANGE_DATE_COOP_DEBUT', dateDebutCoop };
}

function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_COOP_FIN', dateFin };
}

function changeTypes(activiteTypes) {
  return { type: 'CHANGE_TYPES', activiteTypes };
}

function changeMediateurs(mediateursIds) {
  return { type: 'CHANGE_MEDIATEURS', mediateursIds };
}

function changeDepartements(departements) {
  return { type: 'CHANGE_DEPARTEMENTS', departements };
}

function changesearchNomEtOuPrenomConseiller(searchNomEtOuPrenomConseiller) {
  return { type: 'CHANGE_SEARCH_NOM_PRENOM_CONSEILLER', searchNomEtOuPrenomConseiller };
}
