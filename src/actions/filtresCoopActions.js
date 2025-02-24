export const filtresCoopActions = {
  changeDateDebut,
  changeDateFin,
  changeType,
  changeMediateur
};

function changeDateDebut(dateDebutCoop) {
  return { type: 'CHANGE_DATE_COOP_DEBUT', dateDebutCoop };
}

function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_COOP_FIN', dateFin };
}

function changeType(typeCra) {
  return { type: 'CHANGE_TYPE', typeCra };
}

function changeMediateur(mediateurId) {
  return { type: 'CHANGE_MEDIATEUR', mediateurId };
}
