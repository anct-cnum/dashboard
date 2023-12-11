const initialState = {
  departement: 'tous',
  ordreNom: 'codePostal',
  ordre: false,
  pix: [],
  diplome: undefined,
  cv: undefined,
  ccp1: undefined,
  nomCandidat: undefined,
  region: 'tous',
  search: '',
};

export default function filtresCandidatures(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre
      };
    case 'CHANGE_ORDRE_COLONNE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
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
    case 'UPDATE_CCP1':
      return {
        ...state,
        ccp1: action.ccp1,
      };
    case 'CHANGE_DEPARTEMENT':
      return {
        ...state,
        departement: action.departement
      };
    case 'CHANGE_REGION':
      return {
        ...state,
        region: action.region
      };
    case 'CHANGE_NOM_CANDIDAT':
      return {
        ...state,
        nomCandidat: action.nomCandidat,
      };
    case 'UPDATE_SEARCH':
      return {
        ...state,
        search: action.search,
      };
    case 'RESET_FILTER_AND_SORTS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
