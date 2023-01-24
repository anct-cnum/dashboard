const initialState = {
  departement: 'tous',
  ordreNom: 'createdAt',
  ordre: false,
  pix: [],
  diplome: undefined,
  cv: undefined,
  nomCandidat: undefined,
  region: 'tous',
  coms: 'tous',
  search: '',
};

export default function filtresCandidatures(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ORDRE_TOGGLE':
      return {
        ...state,
        ordreNom: action.ordreNom,
        ordre: false
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
    case 'CHANGE_DEPARTEMENT':
      return {
        ...state,
        departement: action.departement
      };
    case 'CHANGE_COMS':
      return {
        ...state,
        coms: action.coms
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
