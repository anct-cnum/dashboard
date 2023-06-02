const initialState = {
  ordre: true,
  ordreNom: undefined,
  territoire: 'codeDepartement',
};

export default function filtresEtTris(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    case 'CHANGE_TERRITOIRE':
      return {
        ...state,
        territoire: action.territoire
      };
    case 'RESET_FILTER_AND_SORTS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
