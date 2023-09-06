const initialState = [];

export default function misesEnRelation(state = initialState, action) {
  switch (action.type) {
    case 'GET_MISESENRELATION_STRUCTURE_REQUEST':
      return {
        ...initialState,
        loading: true,
        error: false
      };
    case 'GET_MISESENRELATION_STRUCTURE_SUCCESS':
      return {
        ...state,
        misesEnRelation: action.misesEnRelation,
        loading: false
      };
    case 'GET_MISESENRELATION_STRUCTURE_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'GET_MISESENRELATION_A_RENOUVELLER_STRUCTURE_REQUEST':
      return {
        ...initialState,
        loading: true,
        error: false
      };
    case 'GET_MISESENRELATION_A_RENOUVELLER_STRUCTURE_SUCCESS':
      return {
        ...state,
        misesEnRelation: action.misesEnRelation,
        loading: false
      };
    case 'GET_MISESENRELATION_A_RENOUVELLER_STRUCTURE_FAILURE':
      return {
        loading: false,
        error: action.error
      };
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
    default:
      return state;
  }
}
