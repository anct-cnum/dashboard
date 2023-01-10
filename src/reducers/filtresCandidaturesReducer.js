const initialState = {
  departement: 'tous',
  ordreNom: 'createdAt',
  pix: [],
  diplome: undefined,
  cv: undefined,
  nomCandidat: undefined,
  region: 'tous',
  coms: 'tous',
};

export default function filtresCandidatures(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_ORDRE':
      return {
        ...state,
        ordreNom: action.ordreNom,
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
    default:
      return state;
  }
}
