const initialState = {
  stats: {
    'nouvelle': 0,
    'interessee': 0,
    'nonInteressee': 0,
    'recrutee': 0,
    'finalisee': 0,
    'toutes': 0,
  }
};

export default function stats(state = initialState, action) {
  switch (action.type) {
    case 'GET_MISES_EN_RELATION_STATS_REQUEST':
      return {
        loading: true
      };
    case 'GET_MISES_EN_RELATION_STATS_SUCCESS':
      return {
        ...state,
        stats: action.stats
      };
    case 'GET_MISES_EN_RELATION_STATS_FAILURE':
      return {
        error: action.error
      };
    case 'GET_CONSEILLERS_FINALISEE_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'GET_CONSEILLERS_FINALISEE_SUCCESS':
      return {
        ...state,
        totalConseillers: action.conseillers.conseillerTotalFinalisee
      };
    case 'GET_CONSEILLERS_FINALISEE_FAILURE':
      return {
        error: action.error
      };
    case 'GET_STATS_TERRITOIRES_REQUEST':
      return {
        ...state,
        statsTerritoiresLoading: true,
        statsTerritoiresError: false,
      };
    case 'GET_STATS_TERRITOIRES_SUCCESS':
      return {
        ...state,
        statsTerritoires: action.statsTerritoires,
        statsTerritoiresLoading: false,
      };
    case 'GET_STATS_TERRITOIRES_FAILURE':
      return {
        ...state,
        statsTerritoiresError: action.error,
        statsTerritoiresLoading: false,
      };
    default:
      return state;
  }
}
