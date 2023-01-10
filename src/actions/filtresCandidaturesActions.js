export const filtresCandidaturesActions = {
  updateOrdre,
  updatePix,
  updateDiplome,
  updateCV,
  changeNomCandidat,
  changeFiltreDepartement,
  changeFiltreComs,
  changeFiltreRegion,
};

function updateOrdre(ordreNom) {
  return dispatch => {
    dispatch(success(ordreNom));
  };

  function success(ordreNom) {
    return { type: 'UPDATE_ORDRE', ordreNom };
  }
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

function changeNomCandidat(nomCandidat) {
  return { type: 'CHANGE_NOM_CANDIDAT', nomCandidat };
}
  
function changeFiltreDepartement(departement) {
  return { type: 'CHANGE_DEPARTEMENT', departement };
}

function changeFiltreComs(coms) {
  return { type: 'CHANGE_COMS', coms };
}
  
function changeFiltreRegion(region) {
  return { type: 'CHANGE_REGION', region };
}
