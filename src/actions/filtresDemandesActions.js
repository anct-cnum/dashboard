export const filtresDemandesActions = {
  changeOrdreConseiller,
  changeOrdreCoordinateur,
  changeNom,
  changeFiltreDepartement,
  changeFiltreRegion,
  changeFiltreAvisPrefet,
  resetFiltre,
};

function changeOrdreConseiller(ordreNom) {
  return { type: 'CHANGE_ORDRE_CONSEILLER', ordreNom };
}

function changeOrdreCoordinateur(ordreNom) {
  return { type: 'CHANGE_ORDRE_COORDINATEUR', ordreNom };
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

function changeFiltreAvisPrefet(avisPrefet) {
  return { type: 'CHANGE_AVIS_PREFET', avisPrefet };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
