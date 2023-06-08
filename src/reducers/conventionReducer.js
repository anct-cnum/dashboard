const initialState = {
  error: false,
};

export default function convention(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_CONVENTION_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_CONVENTION_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.conventions,
      };
    case 'GETALL_CONVENTION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GETALL_HISTORIQUE_CONVENTION_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_HISTORIQUE_CONVENTION_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.conventions,
      };
    case 'GETALL_HISTORIQUE_CONVENTION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_CONVENTION_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_CONVENTION_SUCCESS':
      return {
        ...state,
        convention: action.convention,
        loading: false
      };
    case 'GET_CONVENTION_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    case 'UPDATE_STATUT_CONVENTIONNEMENT':
      return {
        ...state,
        convention: {
          ...state.convention, conventionnement:
          {
            ...state.convention.conventionnement,
            statut: action.statutReconventionnementUpdated
          },
        },
      };
    case 'UPDATE_AVENANT_AJOUT_POSTE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'UPDATE_AVENANT_AJOUT_POSTE_SUCCESS':
      return {
        ...state,
        convention: {
          ...state.convention, demandesCoselec:
            state.convention.demandesCoselec.map(
              demandeCoselec => {
                if (demandeCoselec.statut === 'en_cours' && demandeCoselec.type === 'ajout') {
                  if (action.response.statutAvenantAjoutPosteUpdated === 'validee') {
                    demandeCoselec.nombreDePostesAccorder = action.response.nbDePosteAccorderUpdated;
                  }
                  demandeCoselec.statut = action.response.statutAvenantAjoutPosteUpdated;
                  return demandeCoselec;
                }
                return demandeCoselec;
              }
            ),
        },
        loading: false
      };
    case 'UPDATE_AVENANT_AJOUT_POSTE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'UPDATE_AVENANT_RENDU_POSTE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'UPDATE_AVENANT_RENDU_POSTE_SUCCESS':
      return {
        ...state,
        convention: {
          ...state.convention, demandesCoselec:
            state.convention.demandesCoselec.map(
              demandeCoselec => {
                if (demandeCoselec.statut === 'en_cours' && demandeCoselec.type === 'rendu') {
                  demandeCoselec.statut = action.response.statutAvenantAjoutPosteUpdated;
                  return demandeCoselec;
                }
                return demandeCoselec;
              }
            ),
        },
        loading: false
      };
    case 'UPDATE_AVENANT_RENDU_POSTE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
