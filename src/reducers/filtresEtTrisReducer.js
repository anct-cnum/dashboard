const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  ordre: true,
  ordreNom: undefined,
  territoire: 'codeDepartement',
};

export default function filtresEtTris(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_DEBUT':
      return {
        ...state,
        dateDebut: action.dateDebut,
      };
    case 'CHANGE_DATE_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
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
