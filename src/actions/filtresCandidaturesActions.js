export const filtresCandidaturesActions = {
  toggleOrdre,
  updatePix,
  updateDiplome,
  updateCV,
  updateCCP1,
  changeNomCandidat,
  changeFiltreDepartement,
  changeFiltreRegion,
  changeOrdreColonne,
  updateSearch,
  resetFiltre,
};

function toggleOrdre() {
  return { type: 'TOGGLE_ORDRE' };
}

function changeOrdreColonne(ordreNom) {
  return { type: 'CHANGE_ORDRE_COLONNE', ordreNom };
}

function updatePix(pix) {
  return dispatch => {
    dispatch(success(pix));
  };

  function success(pix) {
    return { type: 'UPDATE_PIX', pix };
  }
}

function updateDiplome(diplome) {
  return dispatch => {
    dispatch(success(diplome));
  };

  function success(diplome) {
    return { type: 'UPDATE_DIPLOME', diplome };
  }
}

function updateCV(cv) {
  return dispatch => {
    dispatch(success(cv));
  };

  function success(cv) {
    return { type: 'UPDATE_CV', cv };
  }
}

function updateCCP1(ccp1) {
  return { type: 'UPDATE_CCP1', ccp1 };
}

function changeNomCandidat(nomCandidat) {
  return { type: 'CHANGE_NOM_CANDIDAT', nomCandidat };
}

function changeFiltreDepartement(departement) {
  return { type: 'CHANGE_DEPARTEMENT', departement };
}

function changeFiltreRegion(region) {
  return { type: 'CHANGE_REGION', region };
}

function updateSearch(search) {
  return { type: 'UPDATE_SEARCH', search };
}

function resetFiltre() {
  return { type: 'RESET_FILTER_AND_SORTS' };
}
