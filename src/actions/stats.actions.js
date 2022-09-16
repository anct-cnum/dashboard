import { statsService } from '../services/stats.service.js';

export const statsActions = {
  getMisesEnRelationStats,
  getConseillersFinalisee
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
