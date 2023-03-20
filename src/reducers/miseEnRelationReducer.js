const initialState = [];

export default function conseillers(state = initialState, action) {
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
    default:
      return state;
  }
}
