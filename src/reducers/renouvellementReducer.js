const initialState = {
  error: false,
  loading: false,
  renouvellement: null
};
  
export default function renouvellement(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_CONTRACT_RENOUVELLEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'CREATE_CONTRACT_RENOUVELLEMENT_SUCCESS':
      return {
        ...state,
        renouvellement: action.renouvellement,
        loading: false
      };
    case 'CREATE_CONTRACT_RENOUVELLEMENT_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    case 'UPDATE_CONTRACT_RENOUVELLEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'UPDATE_CONTRACT_RENOUVELLEMENT_SUCCESS':
      return {
        ...state,
        renouvellement: action.renouvellement,
        loading: false
      };
    case 'UPDATE_CONTRACT_RENOUVELLEMENT_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
