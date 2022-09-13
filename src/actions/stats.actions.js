import { statsService } from '../services/stats.service.js';
import dayjs from 'dayjs';

export const statsActions = {
  getMisesEnRelationStats,
  getConseillersFinalisee,
  getStatsTerritoires
};

const formatDate = date => {
  return dayjs(date).format('YYYY-MM-DD');
};

function getMisesEnRelationStats(id = null) {
  return dispatch => {
    dispatch(request());

    statsService.getMisesEnRelationStats(id)
    .then(
      stats => {
        stats['toutes'] = 0;
        stats.forEach(stat => {
          stats[stat.statut] = stat.count;
          stats['toutes'] += stat.count;
        });
        dispatch(success(stats));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_MISES_EN_RELATION_STATS_REQUEST' };
  }
  function success(stats) {
    return { type: 'GET_MISES_EN_RELATION_STATS_SUCCESS', stats };
  }
  function failure(error) {
    return { type: 'GET_MISES_EN_RELATION_STATS_FAILURE', error };
  }
}

function getConseillersFinalisee() {
  return dispatch => {
    dispatch(request());
    statsService.getConseillersFinalisee()
    .then(
      conseillers => {
        dispatch(success(conseillers));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONSEILLERS_FINALISEE_REQUEST' };
  }
  function success(conseillers) {
    return { type: 'GET_CONSEILLERS_FINALISEE_SUCCESS', conseillers };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLERS_FINALISEE_FAILURE', error };
  }
}

function getStatsTerritoires(territoire = 'departement', dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());
    statsService.getStatsTerritoires(territoire, formatDate(dateDebut), formatDate(dateFin))
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
    return { type: 'GET_STATS_TERRITOIRES_REQUEST' };
  }
  function success(statsTerritoires) {
    return { type: 'GET_STATS_TERRITOIRES_SUCCESS', statsTerritoires };
  }
  function failure(error) {
    return { type: 'GET_STATS_TERRITOIRES_FAILURE', error };
  }
}
