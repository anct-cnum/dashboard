import { statistiquesService } from '../services/statistiquesService';
import { formatDate } from '../utils/formatagesUtils';
import { filterLabelsToDisplay, infoParTypeFiltre } from '../views/connected/commun/statistiques/Components/utils/functionLabel';

export const statistiquesActions = {
  exportStatistiquesNationaleNouvelleCoop,
  changeCodePostalStats,
  changeStructureStats,
  changeConseillerStats,
  changeFiltreRegionStats,
  changeFiltreDepartementStats,
  updateListeAutresReorientations,
  getTerritoire,
  getDatasStructures,
  getDatasTerritoires,
  getStatistiquesStructure,
  getStatistiquesConseiller,
  getStatistiquesConseillerParcoursRecrutement,
  getStatistiquesTerritoire,
  getStatistiquesNationale,
  getStatistiquesNationaleNouvelleCoop,
  getStatistiquesNationaleGrandReseau,
  getCodesPostauxCrasConseillerStructure,
  getFiltresCrasConseiller,
  getFiltresCrasConseillerParcoursRecrutement,
  resetFiltre,
  getConseillersNouvelleCoop,
};

function changeCodePostalStats(codePostal, ville, codeCommune = null) {
  return { type: 'CHANGE_CODE_POSTAL_STATS', codePostal, ville, codeCommune };
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

function exportStatistiquesNationaleNouvelleCoop(donneesStatistiques, filters, departementsOptions, mediateursOptions) {
  return () => {

    if (!donneesStatistiques || !donneesStatistiques.data) {
      return;
    }
    const data = donneesStatistiques.data.attributes;
    let csv = '';
    const filterLabels = filterLabelsToDisplay(
      filters,
      departementsOptions ?? [],
      mediateursOptions ?? [],
    );
    const addSection = (title, items) => {
      if (!items || !items.length) {
        return;
      }
      csv += title + '\n';
      items.forEach(item => {
        csv += `${item.label};${new Intl.NumberFormat('fr-FR').format(item.count)};${item.proportion ? item.proportion.toLocaleString('fr-FR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1
        }) + '%' : ''}\n`;
      });

      csv += '\n';
    };

    csv += 'Filtres appliqués :\n';
    for (const [type, labels] of Object.entries(infoParTypeFiltre(filterLabels))) {
      const title = type.charAt(0).toUpperCase() + type.slice(1);
      csv += title + ';' + labels.join(' | ') + '\n';
    }
    csv += '\n';
    csv += 'STATISTIQUES GÉNÉRALES\n';
    csv += `Accompagnements;${data.totaux.accompagnements.total}\n`;
    csv += `Bénéficiaires accompagnés;${data.totaux.beneficiaires.total}\n`;
    csv += `dont\n`;
    csv += `;nouveaux;${data.totaux.beneficiaires.nouveaux}\n`;
    csv += `;bénéficiaires suivis;${data.totaux.beneficiaires.suivis}\n`;
    csv += `;bénéficiaires anonymes;${data.totaux.beneficiaires.anonymes}\n`;
    csv += '\n';
    addSection('Nombre d’accompagnements par jour', data.accompagnements_par_jour);
    addSection('Nombre d’accompagnements par mois', data.accompagnements_par_mois);

    addSection('STATISTIQUES SUR LES ACTIVITÉS', data.activites.type_activites);
    addSection('Médiation numérique', data.activites.thematiques);
    addSection('Démarches administratives', data.activites.thematiques_demarches);
    addSection('Canaux des activités', data.activites.type_lieu);
    addSection('Durée des activités', data.activites.durees);

    csv += `STATISTIQUES SUR LES BÉNÉFICIAIRES\n`;
    addSection('Genres', data.beneficiaires?.genres);
    addSection('Tranches d’âge', data.beneficiaires?.tranche_ages);
    addSection('Statuts', data.beneficiaires?.statuts_social);

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `statistiques-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    return;
  };
}

function getStatistiquesNationaleNouvelleCoop(dateDebut, dateFin, types, mediateurs, departements, signal) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getStatistiquesNationaleNouvelleCoop(formatDate(dateDebut), formatDate(dateFin), types, mediateurs, departements, signal)
    .then(
      statsNouvelleCoop => {
        dispatch(success(statsNouvelleCoop));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_COOP_REQUEST' };
  }
  function success(statsCoop) {
    return { type: 'GET_STATS_CRA_COOP_SUCCESS', statsCoop };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_COOP_FAILURE', error };
  }
}

function getStatistiquesNationaleGrandReseau(dateDebut, dateFin, codeCommune, codePostal, codeRegion, numeroDepartement, structureId, conseillerId) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getStatistiquesNationaleGrandReseau(formatDate(dateDebut), formatDate(dateFin),
      codeCommune, codePostal, codeRegion, numeroDepartement, structureId, conseillerId)
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

function getTerritoire(typeTerritoire, idTerritoire, dateFin) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getTerritoire(typeTerritoire, idTerritoire, formatDate(dateFin))
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

function getStatistiquesTerritoire(dateDebutStats, dateFinStats, typeTerritoire, idTerritoire) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getStatistiquesTerritoire(formatDate(dateDebutStats), formatDate(dateFinStats), typeTerritoire, idTerritoire)
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

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal = null, codeCommune = null) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getStatistiquesStructure(formatDate(dateDebut), formatDate(dateFin), idStructure, codePostal, codeCommune)
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

function getStatistiquesConseiller(dateDebut, dateFin, idConseiller, codePostal = null, codeCommune = null, idStructure) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getStatistiquesConseiller(formatDate(dateDebut), formatDate(dateFin), idConseiller, codePostal, codeCommune, idStructure)
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

function getStatistiquesConseillerParcoursRecrutement(dateDebut, dateFin, idConseiller, codePostal = null, codeCommune = null, idStructure) {
  return dispatch => {
    dispatch(request());
    statistiquesService.getStatistiquesConseillerParcoursRecrutement(
      formatDate(dateDebut), formatDate(dateFin), idConseiller, codePostal, codeCommune, idStructure
    )
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

function getFiltresCrasConseiller(idConseiller) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getFiltresCrasConseiller(idConseiller)
    .then(
      response => {
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_FILTRES_CONSEILLER_CRA_REQUEST' };
  }
  function success(response) {
    return { type: 'GET_FILTRES_CONSEILLER_CRA_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'GET_FILTRES_CONSEILLER_CRA_FAILURE', error };
  }
}

function getFiltresCrasConseillerParcoursRecrutement(idConseiller) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getFiltresCrasConseillerParcoursRecrutement(idConseiller)
    .then(
      response => {
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_FILTRES_CONSEILLER_CRA_REQUEST' };
  }
  function success(response) {
    return { type: 'GET_FILTRES_CONSEILLER_CRA_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'GET_FILTRES_CONSEILLER_CRA_FAILURE', error };
  }
}

function resetFiltre() {
  return { type: 'RESET_FILTRES_STATS' };
}

function getConseillersNouvelleCoop(search) {
  return dispatch => {
    dispatch(request());

    statistiquesService.getConseillersNouvelleCoop(search)
    .then(
      conseillers => dispatch(success(conseillers)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONSEILLERS_NOUVELLE_COOP_REQUEST' };
  }
  function success(conseillersOptions) {
    return { type: 'GET_CONSEILLERS_NOUVELLE_COOP_SUCCESS', conseillersOptions };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLERS_NOUVELLE_COOP_FAILURE', error };
  }
}
