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
        structure: { ...state.structure, contact: { ...state.structure?.contact, email: action.emailUpdated } },
        emailUpdated: true,
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
    case 'GETALL_DEMANDES_COORDINATEUR_FAILURE':
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
        structure: action.structure,
      };
    case 'GET_DEMANDE_CONSEILLER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
