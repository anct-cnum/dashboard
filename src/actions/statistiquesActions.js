import { statistiquesService } from '../services/statistiquesService';
import { formatDate } from '../utils/formatagesUtils';

export const statistiquesActions = {
  changeCodePostalStats,
  changeStructureStats,
  changeConseillerStats,
  changeFiltreRegionStats,
  changeFiltreDepartementStats,
  updateListeAutresReorientations,
  getTerritoire,
  getDatasStructures,
  getDatasTerritoires,
  getDatasTerritoiresPrefet,
  getStatistiquesStructure,
  getStatistiquesConseiller,
  getStatistiquesTerritoire,
  getStatistiquesNationale,
  getStatistiquesNationaleGrandReseau,
  getCodesPostauxCrasConseillerStructure,
  getCodesPostauxCrasConseiller,
  resetFiltre,
};

function changeCodePostalStats(codePostal, ville) {
  return { type: 'CHANGE_CODE_POSTAL_STATS', codePostal, ville };
}

function changeStructureStats(structureId) {
  return { type: 'CHANGE_STRUCTURE_STATS', structureId };
}

function changeConseillerStats(conseillerId) {
  return { type: 'CHANGE_CONSEILLER_STATS', conseillerId };
}

function changeFiltreRegionStats(codeRegion) {
  return { type: 'CHANGE_REGION_STATS', codeRegion };
}

function changeFiltreDepartementStats(numeroDepartement) {
  return { type: 'CHANGE_DEPARTEMENT_STATS', numeroDepartement };
}


function getStatistiquesNationale(dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getStatistiquesNationale(formatDate(dateDebut), formatDate(dateFin))
    .then(
      statsNationales => {
        dispatch(success(statsNationales));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_NATIONALES_REQUEST' };
  }
  function success(statsNationales) {
    return { type: 'GET_STATS_CRA_NATIONALES_SUCCESS', statsNationales };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_NATIONALES_FAILURE', error };
  }
}

function getStatistiquesNationaleGrandReseau(dateDebut, dateFin, ville, codePostal, codeRegion, numeroDepartement, structureId, conseillerId) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getStatistiquesNationaleGrandReseau(formatDate(dateDebut), formatDate(dateFin)
      , ville, codePostal, codeRegion, numeroDepartement, structureId, conseillerId)
    .then(
      statsNationales => {
        dispatch(success(statsNationales));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_NATIONALES_REQUEST' };
  }
  function success(statsNationales) {
    return { type: 'GET_STATS_CRA_NATIONALES_SUCCESS', statsNationales };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_NATIONALES_FAILURE', error };
  }
}

function updateListeAutresReorientations(listeAutresReorientations) {
  return { type: 'UPDATE_AUTRES_REORIENTATIONS', listeAutresReorientations };
}

function getDatasTerritoires(territoire = 'departement', dateDebut, dateFin, page, nomOrdre = 'code', ordre = 1) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getDatasTerritoires(territoire, formatDate(dateDebut), formatDate(dateFin), page, nomOrdre, ordre)
    .then(
      statsTerritoires => {
        dispatch(success(statsTerritoires));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_DATAS_TERRITOIRES_REQUEST' };
  }
  function success(statsTerritoires) {
    return { type: 'GET_DATAS_TERRITOIRES_SUCCESS', statsTerritoires };
  }
  function failure(error) {
    return { type: 'GET_DATAS_TERRITOIRES_FAILURE', error };
  }
}

function getDatasTerritoiresPrefet(territoire = 'departement', dateDebut, dateFin, page, nomOrdre = 'code', ordre = 1) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getDatasTerritoiresPrefet(territoire, formatDate(dateDebut), formatDate(dateFin), page, nomOrdre, ordre)
    .then(
      statsTerritoires => {
        dispatch(success(statsTerritoires));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_DATAS_TERRITOIRES_REQUEST' };
  }
  function success(statsTerritoires) {
    return { type: 'GET_DATAS_TERRITOIRES_SUCCESS', statsTerritoires };
  }
  function failure(error) {
    return { type: 'GET_DATAS_TERRITOIRES_FAILURE', error };
  }
}

function getTerritoire(typeTerritoire, idTerritoire, date) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getTerritoire(typeTerritoire, idTerritoire, formatDate(date))
    .then(
      territoire => dispatch(success(territoire)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_TERRITOIRE_REQUEST' };
  }
  function success(territoire) {
    return { type: 'GET_TERRITOIRE_SUCCESS', territoire };
  }
  function failure(error) {
    return { type: 'GET_TERRITOIRE_FAILURE', error };
  }
}

function getStatistiquesTerritoire(dateDebutStats, dateFinStats, typeTerritoire, conseillerIds) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getStatistiquesTerritoire(formatDate(dateDebutStats), formatDate(dateFinStats), typeTerritoire, conseillerIds)
    .then(
      statsTerritoire => {
        dispatch(success(statsTerritoire));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_TERRITOIRE_REQUEST' };
  }
  function success(statsTerritoire) {
    return { type: 'GET_STATS_CRA_TERRITOIRE_SUCCESS', statsTerritoire };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_TERRITOIRE_FAILURE', error };
  }
}
function getDatasStructures(dateDebut, dateFin, page) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getDatasStructures(formatDate(dateDebut), formatDate(dateFin), page)
    .then(
      statsStructures => {
        dispatch(success(statsStructures));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_DATAS_STRUCTURES_REQUEST' };
  }
  function success(statsStructure) {
    return { type: 'GET_DATAS_STRUCTURES_SUCCESS', statsStructure };
  }
  function failure(error) {
    return { type: 'GET_DATAS_STRUCTURES_FAILURE', error };
  }
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal = null, ville = null) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getStatistiquesStructure(formatDate(dateDebut), formatDate(dateFin), idStructure, codePostal, ville)
    .then(
      statsStructure => {
        dispatch(success(statsStructure));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_STRUCTURE_REQUEST' };
  }
  function success(statsStructure) {
    return { type: 'GET_STATS_CRA_STRUCTURE_SUCCESS', statsStructure };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_STRUCTURE_FAILURE', error };
  }
}

function getStatistiquesConseiller(dateDebut, dateFin, idConseiller, codePostal = null, ville = null) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getStatistiquesConseiller(formatDate(dateDebut), formatDate(dateFin), idConseiller, codePostal, ville)
    .then(
      statsConseiller => {
        dispatch(success(statsConseiller));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_CONSEILLER_REQUEST' };
  }
  function success(statsConseiller) {
    return { type: 'GET_STATS_CRA_CONSEILLER_SUCCESS', statsConseiller };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_CONSEILLER_FAILURE', error };
  }
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getCodesPostauxCrasConseillerStructure(idStructure)
    .then(
      listeCodesPostaux => {
        dispatch(success(listeCodesPostaux));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CODES_POSTAUX_CRA_REQUEST' };
  }
  function success(listeCodesPostaux) {
    return { type: 'GET_CODES_POSTAUX_CRA_SUCCESS', listeCodesPostaux };
  }
  function failure(error) {
    return { type: 'GET_CODES_POSTAUX_CRA_FAILURE', error };
  }
}

function getCodesPostauxCrasConseiller(idConseiller) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getCodesPostauxCrasConseiller(idConseiller)
    .then(
      listeCodesPostaux => {
        dispatch(success(listeCodesPostaux));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CODES_POSTAUX_CRA_REQUEST' };
  }
  function success(listeCodesPostaux) {
    return { type: 'GET_CODES_POSTAUX_CRA_SUCCESS', listeCodesPostaux };
  }
  function failure(error) {
    return { type: 'GET_CODES_POSTAUX_CRA_FAILURE', error };
  }
}

function resetFiltre() {
  return { type: 'RESET_FILTRES_STATS' };
}
