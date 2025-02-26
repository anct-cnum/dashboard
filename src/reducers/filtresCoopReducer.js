const initialState = {
  dateFin: new Date(),
  dateDebutCoop: new Date(1731628800000),
  minDateCoop: new Date(1731628800000),
  maxDateCoop: new Date(),
  type: '',
  mediateur: '',
  searchNomEtOuPrenomConseiller: '',
  conseillersOptions: []
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
    case 'GET_CONSEILLERS_NOUVELLE_COOP_REQUEST':
      return {
        ...state,
        error: false,
        loadingNouvelleCoop: true
      };
    case 'GET_CONSEILLERS_NOUVELLE_COOP_SUCCESS':
      return {
        ...state,
        loadingNouvelleCoop: false,
        conseillersOptions: action.conseillersOptions.result,
      };
    case 'GET_CONSEILLERS_NOUVELLE_COOP_FAILURE':
      return {
        ...state,
        loadingNouvelleCoop: false,
        error: action.error
      };
    default:
      return state;
  }
}
