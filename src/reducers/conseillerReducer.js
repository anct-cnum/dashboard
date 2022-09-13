export default function conseiller(state = null, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        loading: true
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
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
        miseEnRelation: action.miseEnRelation,
        errorUpdateStatus: false
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
        loading: true
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
    case 'VERIFY_CANDIDATE_TOKEN_REQUEST':
      return {
        verifyingToken: true
      };
    case 'VERIFY_CANDIDATE_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        conseiller: action.conseiller
      };
    case 'VERIFY_CANDIDATE_TOKEN_FAILURE':
      return {
        tokenVerified: false,
        error: action.error
      };
    case 'VERIFY_SONDAGE_TOKEN_REQUEST':
      return {
        verifyingToken: true
      };
    case 'VERIFY_SONDAGE_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        conseiller: action.conseiller
      };
    case 'VERIFY_SONDAGE_TOKEN_FAILURE':
      return {
        tokenVerified: false,
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
        downloading: false,
        isDownloaded: false
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };

    case 'GET_STRUCTURE_EMPLOYER_REQUEST':
      return {
        ...state,
        loadingStructureNom: true
      };
    case 'GET_STRUCTURE_EMPLOYER_SUCCESS':
      return {
        ...state,
        nomStructure: action.structure
      };
    case 'GET_STRUCTURE_EMPLOYER_FAILURE':
      return {
        nomStructureError: action.error,
      };
    case 'DELETE_CONSEILLER_REQUEST':
      return {
        loading: true,
        ...state,
        conseillerDelete: false
      };
    case 'DELETE_CONSEILLER_SUCCESS':
      return {
        loading: false,
        ...state,
        conseillerSuccessSuppression: action.deleteSuccess
      };
    case 'DELETE_CONSEILLER_FAILURE':
      return {
        loading: false,
        conseillerErreurSuppression: action.error
      };
    case 'RESUBMIT_INSCRIPTION_CANDIDAT_REQUEST':
      return {
        ...state,
        flashMessage: false,
        loadingInvitCandidatConseiller: true,
        errorResendInvitCandidatConseiller: false
      };
    case 'RESUBMIT_INSCRIPTION_CANDIDAT_SUCCESS':
      return {
        ...state,
        flashMessage: true,
        successResendInvitCandidatConseiller: action.user.emailEnvoyer,
        loadingInvitCandidatConseiller: false
      };
    case 'RESUBMIT_INSCRIPTION_CANDIDAT_FAILURE':
      return {
        ...state,
        errorResendInvitCandidatConseiller: action.error,
        flashMessage: true,
        loadingInvitCandidatConseiller: false
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
