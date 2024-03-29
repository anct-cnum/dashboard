const initialState = {
  nom: undefined,
  ordre: true,
  ordreNom: 'dateDemande',
  region: 'tous',
  departement: 'tous',
  statutDossierRupture: 'tous',
  avisAdmin: 'tous',
  avisPrefet: 'tous',
};

export default function filtresConventions(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NOM':
      return {
        ...state,
        nom: action.nom,
      };
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    case 'CHANGE_REGION':
      return {
        ...state,
        region: action.region
      };
    case 'CHANGE_DEPARTEMENT':
      return {
        ...state,
        departement: action.departement
      };
    case 'CHANGE_STATUT_DOSSIER_RUPTURE':
      return {
        ...state,
        statutDossierRupture: action.statutDossierRupture
      };
    case 'CHANGE_AVIS_ADMIN_CANDIDATURE':
      return {
        ...state,
        avisAdmin: action.avisAdmin
      };
    case 'CHANGE_AVIS_PREFET':
      return {
        ...state,
        avisPrefet: action.avisPrefet
      };
    case 'RESET_FILTER_AND_SORTS':
      return initialState;
    default:
      return state;
  }
}

