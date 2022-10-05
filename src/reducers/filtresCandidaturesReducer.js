export default function filtresCandidatures(state = null, action) {
  switch (action.type) {
    case 'UPDATE_ORDER':
      return {
        ...state,
        order: action.order,
      };
    case 'UPDATE_PIX':
      return {
        ...state,
        pix: action.pix,
      };
    case 'UPDATE_DIPLOME':
      return {
        ...state,
        diplome: action.diplome,
      };
    case 'UPDATE_CV':
      return {
        ...state,
        cv: action.cv,
      };
    default:
      return state;
  }
}
