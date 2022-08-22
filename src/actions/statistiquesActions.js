import { statistiquesService } from '../services/statistiquesService';
import dayjs from 'dayjs';

export const statistiquesActions = {
  changeDateDebut,
  changeDateFin,
  getStatsNationale,
};

const formatDate = date => {
  return dayjs(date).format('YYYY-MM-DD');
};

function changeDateDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT', dateDebut };
}

function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN', dateFin };
}

function getStatsNationale(dateDebut, dateFin) {
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
