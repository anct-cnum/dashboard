const initialState = {
  isLoading: false,
  alerte: {
    type: null,
    status: null,
    message: null,
    description: null
  }
};
export default function alerteEtSpinner(state = initialState, action) {
  switch (action.type) {
    case 'GET_IS_LOADING':
      return {
        isLoading: action.isLoading
      };
    case 'GET_MESSAGE_ALERTE':
      return {
        isLoading: false,
        alerte: action.alerte
      };
    case 'RESET_MESSAGE_ALERTE':
      return {
        ...initialState
      };
    default:
      return state;
  }
}
