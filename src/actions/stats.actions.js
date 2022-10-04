import { statsService } from '../services/stats.service.js';

export const statsActions = {
  getMisesEnRelationStats
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
