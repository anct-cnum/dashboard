const initialState = {
  dateFin: new Date(),
  dateDebutCoop: new Date(1605571200000),
  minDateCoop: new Date(1605571200000),
  maxDateCoop: new Date(),
  types: [],
  mediateurs: [],
  departements: [],
  searchNomEtOuPrenomConseiller: '',
  conseillersOptions: [],
  loadingOptions: false
};

export default function filterCoop(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_COOP_DEBUT':
      return {
        ...state,
        dateDebutCoop: action.dateDebutCoop,
      };
    case 'CHANGE_DATE_COOP_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
    case 'CHANGE_TYPES':
      return {
        ...state,
        types: action.activiteTypes,
      };
    case 'CHANGE_MEDIATEURS':
      return {
        ...state,
        mediateurs: action.mediateursIds,
      };
    case 'CHANGE_DEPARTEMENTS':
      return {
        ...state,
        departements: action.departements,
      };
    case 'GET_CONSEILLERS_NOUVELLE_COOP_REQUEST':
      return {
        ...state,
        error: false,
        loadingOptions: true
      };
    case 'GET_CONSEILLERS_NOUVELLE_COOP_SUCCESS':
      return {
        ...state,
        loadingOptions: false,
        conseillersOptions: action.conseillersOptions.result,
      };
    case 'GET_CONSEILLERS_NOUVELLE_COOP_FAILURE':
      return {
        ...state,
        loadingOptions: false,
        error: action.error
      };
    default:
      return state;
  }
}
