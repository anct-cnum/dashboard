const initialState = {
  variablesApiDS: [
    {
      demarcheNumber: 69665,
      after: ''
    },
    {
      demarcheNumber: 69686,
      after: ''
    },
    {
      demarcheNumber: 69687,
      after: ''
    }
  ],
  error: false,
};

export default function reconventionnement(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_RECONVENTIONNEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_RECONVENTIONNEMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.response.items,
        variablesApiDS: action.response.page
      };
    case 'GETALL_RECONVENTIONNEMENT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_RECONVENTIONNEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_RECONVENTIONNEMENT_SUCCESS':
      return {
        ...state,
        reconventionnement: action.reconventionnement,
        loading: false
      };
    case 'GET_RECONVENTIONNEMENT_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
