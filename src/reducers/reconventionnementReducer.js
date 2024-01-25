const initialState = {
  error: false,
};

export default function reconventionnement(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_RECONVENTIONNEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'UPDATE_RECONVENTIONNEMENT_SUCCESS':
      return {
        ...state,
        reconventionnement: action.reconventionnement,
        loading: false
      };
    case 'UPDATE_RECONVENTIONNEMENT_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
