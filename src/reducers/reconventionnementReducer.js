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
        items: action.reconventionnements
      };
    case 'GETALL_RECONVENTIONNEMENT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
