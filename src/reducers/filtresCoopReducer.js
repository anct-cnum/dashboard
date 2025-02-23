const initialState = {
  dateFin: new Date(),
  dateDebutCoop: new Date(1731628800000),
  minDateCoop: new Date(1731628800000),
  maxDateCoop: new Date(),
  type: '',
  mediateur: '',
  lieu: {
    lieu: null,
    commune: null,
    departement: null,
  }
};

export default function filterCoop(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_COOP_DEBUT':
      return {
        ...state,
        dateDebutCoop: action?.dateDebutCoop,
      };
    case 'CHANGE_DATE_COOP_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
    case 'CHANGE_TYPE':
      return {
        ...state,
        type: action.typeCra,
      };
    case 'CHANGE_MEDIATEUR':
      return {
        ...state,
        mediateur: action.mediateurId,
      };
    case 'CHANGE_LIEU':
      return {
        ...state,
        lieu: action.lieu,
      };
    default:
      return state;
  }
}
