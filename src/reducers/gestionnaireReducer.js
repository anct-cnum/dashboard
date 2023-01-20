const initialState = {
  error: false,
};

export default function gestionnaire(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_GESTIONNAIRES_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_GESTIONNAIRES_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.gestionnaires
      };
    case 'GETALL_GESTIONNAIRES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
