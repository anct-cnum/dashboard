const initialState = {
  error: false,
};

export default function convention(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_CONVENTION_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_CONVENTION_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.conventions,
      };
    case 'GETALL_CONVENTION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GETALL_HISTORIQUE_CONVENTION_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_HISTORIQUE_CONVENTION_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.conventions,
      };
    case 'GETALL_HISTORIQUE_CONVENTION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_CONVENTION_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_CONVENTION_SUCCESS':
      return {
        ...state,
        convention: action.convention,
        loading: false
      };
    case 'GET_CONVENTION_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    case 'RESET_CONVENTION':
      return {
        ...state,
        items: { ...state.items, data: [], total: 0 },
      };
    default:
      return state;
  }
}
