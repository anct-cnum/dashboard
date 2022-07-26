const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebut: new Date(anneeEnCours + '/01/01'),
  dateFin: new Date(),
  error: false,
  miseEnRelation: undefined,
  currentPage: undefined,
  currentFilter: undefined
};

export default function conseiller(state = initialState, action) {
  switch (action.type) {
    case 'GET_CANDIDAT_REQUEST':
      return {
        ...initialState,
        loading: true,
        error: false
      };
    case 'GET_CANDIDAT_SUCCESS':
      return {
        ...state,
        conseiller: action.candidat,
        loading: false
      };
    case 'GET_CANDIDAT_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'GET_CONSEILLER_REQUEST':
      return {
        ...initialState,
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
        ...state,
        conseiller: state?.conseiller,
        downloading: true,
        isDownloaded: false,
        downloadError: false
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
        errorUpdateStatus: action.error,
        conseiller: action.conseiller
      };
    case 'GETALL_RECRUTER_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_RECRUTER_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.conseillers
      };
    case 'GETALL_RECRUTER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GETALL_CANDIDATS_ADMIN_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_CANDIDATS_ADMIN_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.candidats
      };
    case 'GETALL_CANDIDATS_ADMIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GETALL_CANDIDATS_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_CANDIDATS_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.conseillers
      };
    case 'GETALL_CANDIDATS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'RESUBMIT_INSCRIPTION_CANDIDAT_REQUEST':
      return {
        ...state,
        loading: true,
        errorCandidat: false
      };
    case 'RESUBMIT_INSCRIPTION_CANDIDAT_SUCCESS':
      return {
        ...state,
        successResendInvitCandidatConseiller: action.successRelanceInvitation,
        loading: false
      };
    case 'RESUBMIT_INSCRIPTION_CANDIDAT_FAILURE':
      return {
        ...state,
        errorCandidat: action.error,
        loading: false
      };
    case 'DELETE_CANDIDAT_REQUEST':
      return {
        ...state,
        loading: true,
        errorCandidat: false
      };
    case 'DELETE_CANDIDAT_SUCCESS':
      return {
        ...state,
        loading: false,
        successDeleteCandidat: action.deleteSuccess
      };
    case 'DELETE_CANDIDAT_FAILURE':
      return {
        ...state,
        loading: false,
        errorCandidat: action.error
      };
    default:
      return state;
  }
}
