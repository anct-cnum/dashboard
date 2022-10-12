export default function conseiller(state = null, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller,
        loading: false
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'UPDATE_STATUS_REQUEST':
      return {
        ...state,
        errorUpdateStatus: false
      };
    case 'UPDATE_STATUS_SUCCESS':
      return {
        ...state,
        miseEnRelation: action.miseEnRelation
      };
    case 'UPDATE_STATUS_FAILURE':
      return {
        ...state,
        errorUpdateStatus: action.error
      };
    case 'UPDATE_DATE_REQUEST':
      return {
        ...state,
        dateRecrutementUpdated: false
      };
    case 'UPDATE_DATE_SUCCESS':
      return {
        ...state,
        miseEnRelation: action.miseEnRelation,
        dateRecrutementUpdated: true
      };
    case 'PRESELECTIONNER_CONSEILLER_REQUEST':
      return {
        loading: true,
        error: false,
      };
    case 'PRESELECTIONNER_CONSEILLER_SUCCESS':
      return {
        ...state,
        misEnRelation: action.miseEnRelation
      };
    case 'PRESELECTIONNER_CONSEILLER_FAILURE':
      return {
        error: action.error
      };
    case 'GET_CURRICULUM_VITAE_REQUEST':
      return {
        conseiller: state?.conseiller,
        downloading: true,
        isDownloaded: false
      };
    case 'GET_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        blob: action.data,
        isDownloaded: action.download,
        downloading: false,
      };
    case 'GET_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        downloadError: action.error,
        downloading: false
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };
    case 'UPDATE_MOTIF_RUPTURE_REQUEST':
      return {
        ...state,
        loading: true,
        errorUpdateStatus: false
      };
    case 'UPDATE_MOTIF_RUPTURE_SUCCESS':
      return {
        ...state,
        loading: false
      };
    case 'UPDATE_MOTIF_RUPTURE_FAILURE':
      return {
        ...state,
        loading: false,
        errorUpdateStatus: action.error
      };
    case 'UPDATE_DATE_RUPTURE_REQUEST':
      return {
        ...state,
        loading: true,
        errorUpdateStatus: false
      };
    case 'UPDATE_DATE_RUPTURE_SUCCESS':
      return {
        ...state,
        loading: false
      };
    case 'UPDATE_DATE_RUPTURE_FAILURE':
      return {
        ...state,
        loading: false,
        errorUpdateStatus: action.error
      };
    default:
      return state;
  }
}
