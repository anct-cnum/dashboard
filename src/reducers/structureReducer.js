const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebut: new Date(anneeEnCours + '/01/01'),
  dateFin: new Date(),
  error: false,
};

export default function structure(state = initialState, action) {
  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure,
        loading: false
      };
    case 'GET_STRUCTURE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'GET_CONNECTED_STRUCTURE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_CONNECTED_STRUCTURE_SUCCESS':
      return {
        ...state,
        connectedStructure: action.structure,
        loading: false
      };
    case 'GET_CONNECTED_STRUCTURE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'GET_STRUCTURE_DETAILS_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_STRUCTURE_DETAILS_SUCCESS':
      return {
        ...state,
        structure: action.structure,
        loading: false
      };
    case 'GET_STRUCTURE_DETAILS_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'GETALL_STRUCTURE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_STRUCTURE_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.structures
      };
    case 'GETALL_STRUCTURE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'PATCH_STRUCTURE_CONTACT_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
        contactUpdated: false,
        flashMessage: false
      };
    case 'PATCH_STRUCTURE_CONTACT_SUCCESS':
      return {
        ...state,
        loading: false,
        contactUpdated: true,
        structure: action.structure,
        flashMessage: true
      };
    case 'PATCH_STRUCTURE_CONTACT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        flashMessage: true
      };
    case 'VERIFY_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        loadingSiret: true,
        error: false
      };
    case 'VERIFY_STRUCTURE_SIRET_SUCCESS':
      return {
        ...state,
        nomStructure: action.nomStructure,
        loadingSiret: false
      };
    case 'VERIFY_STRUCTURE_SIRET_FAILURE':
      return {
        ...state,
        error: action.error,
        loadingSiret: false
      };
    case 'UPDATE_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_STRUCTURE_SIRET_SUCCESS':
      return {
        ...state,
        structure: { ...state.structure, siret: action.siretUpdated },
        nomStructure: null,
        loading: false
      };
    case 'UPDATE_STRUCTURE_SIRET_FAILURE':
      return {
        ...state,
        loading: false,
        nomStructure: null,
        error: action.error,
      };
    case 'CANCEL_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        nomStructure: null,
        loadingSiret: false
      };
    case 'UPDATE_STRUCTURE_EMAIL_REQUEST':
      return {
        ...state,
        loading: true,
        emailUpdated: false,
        error: false,
      };
    case 'UPDATE_STRUCTURE_EMAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        structure: {
          ...state.structure,
          contact: { ...state?.structure?.contact, email: action.result.emailUpdated },
          users: [...(action.result.newUserInvit ?
            [...(state?.structure?.users ?? []), { name: action.result.emailUpdated }] :
            (state?.structure?.users ?? []))]
        },
        emailUpdated: true,
        newUserInvit: action.result.newUserInvit
      };
    case 'UPDATE_STRUCTURE_EMAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'ADD_USERS_TO_STRUCTURE':
      return {
        ...state,
        structure: { ...state.structure, users: [...state.structure.users, action.account] },
      };
    case 'ERROR_MESSAGE_HIDDEN':
      return {
        ...state,
        error: false,
        flashMessage: false
      };
    case 'CREATE_AVENANT_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'CREATE_AVENANT_SUCCESS':
      return {
        ...state,
        loading: false,
        structure: action.structure,
      };
    case 'CREATE_AVENANT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'CLOSE_BANNER_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'CLOSE_BANNER_SUCCESS':
      return {
        ...state,
        loading: false,
        structure: action.structure,
      };
    case 'CLOSE_BANNER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'GETALL_DEMANDES_CONSEILLER_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_DEMANDES_CONSEILLER_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.structures,
      };
    case 'GETALL_DEMANDES_CONSEILLER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_DEMANDE_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_DEMANDE_CONSEILLER_SUCCESS':
      return {
        ...state,
        loading: false,
        structure: action.response.structure,
        listeStructure: action.response?.listeStructure,
      };
    case 'GET_DEMANDE_CONSEILLER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'UPDATE_AVIS_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_AVIS_PREFET_SUCCESS':
      return {
        ...state,
        successAvisPrefet: action.success,
        loading: false
      };
    case 'UPDATE_AVIS_PREFET_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_AVENANT_AVIS_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_AVENANT_AVIS_PREFET_SUCCESS':
      return {
        ...state,
        successAvisPrefet: action.success,
        loading: false
      };
    case 'UPDATE_AVENANT_AVIS_PREFET_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_COMMENTAIRE_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_COMMENTAIRE_PREFET_SUCCESS':
      return {
        ...state,
        structure: { ...state.structure, prefet: action.prefet },
        loading: false
      };
    case 'UPDATE_COMMENTAIRE_PREFET_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_COMMENTAIRE_AVENANT_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_COMMENTAIRE_AVENANT_PREFET_SUCCESS':
      return {
        ...state,
        structure: { ...state.structure, demandesCoselec: action.demandesCoselec },
        loading: false
      };
    case 'UPDATE_COMMENTAIRE_AVENANT_PREFET_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_BANNER_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_BANNER_PREFET_SUCCESS':
      return {
        ...state,
        loading: false,
        items: {
          ...state.items, structurePrimoEntranteBannerAvisPrefetOpen: state?.items?.structurePrimoEntranteBannerAvisPrefetOpen?.filter(
            structure => structure._id !== action.idStructure)
        },
      };
    case 'UPDATE_BANNER_PREFET_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_BANNER_AVENANT_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_BANNER_AVENANT_PREFET_SUCCESS':
      return {
        ...state,
        loading: false,
        items: {
          ...state.items, ajoutPosteBannerAvisPrefetOpen: state?.items?.ajoutPosteBannerAvisPrefetOpen?.filter(
            structure => structure._id !== action.idStructure)
        },
      };
    case 'UPDATE_BANNER_AVENANT_PREFET_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_AVIS_ADMIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_AVIS_ADMIN_SUCCESS':
      return {
        ...state,
        successAvisAdmin: true,
        loading: false
      };
    case 'UPDATE_AVIS_ADMIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'RESET_CONFIRMATION_AVIS_ADMIN':
      return {
        ...state,
        successAvisAdmin: false,
      };
    default:
      return state;
  }
}
