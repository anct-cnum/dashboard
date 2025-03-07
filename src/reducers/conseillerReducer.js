const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebut: new Date(anneeEnCours + '/01/01'),
  dateFin: new Date(),
  error: false,
  successDeleteCandidat: false,
  errorRelanceInvitation: false,
  miseEnRelation: undefined,
  currentPage: undefined,
  currentFilter: undefined
};

export default function conseiller(state = initialState, action) {
  switch (action.type) {
    case 'GET_CANDIDAT_REQUEST':
      return {
        ...state,
        successDeleteCandidat: false,
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
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_CANDIDAT_STRUCTURE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_CANDIDAT_STRUCTURE_SUCCESS':
      return {
        ...state,
        conseiller: action.candidat,
        loading: false
      };
    case 'GET_CANDIDAT_STRUCTURE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
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
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_CONNECTED_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_CONNECTED_CONSEILLER_SUCCESS':
      return {
        ...state,
        connectedConseiller: action.conseiller,
        loading: false
      };
    case 'GET_CONNECTED_CONSEILLER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_CONSEILLER_CONTRAT_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_CONSEILLER_CONTRAT_SUCCESS':
      return {
        ...state,
        conseillerContrat: action.conseiller,
        loading: false
      };
    case 'GET_CONSEILLER_CONTRAT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_STATUS_REQUEST':
      return {
        ...state,
        errorUpdateStatus: false,
        loading: true
      };
    case 'UPDATE_STATUS_SUCCESS':
      return {
        ...state,
        conseiller: {
          ...state.conseiller, miseEnRelation: action.miseEnRelation, misesEnRelation: state.conseiller.misesEnRelation
          ?.map(miseEnRelation => miseEnRelation._id === action.miseEnRelation._id ? action.miseEnRelation : miseEnRelation)
        },
        loading: false
      };
    case 'UPDATE_STATUS_FAILURE':
      return {
        ...state,
        errorUpdateStatus: action.error,
        loading: false
      };
    case 'UPDATE_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller,
      };
    case 'PRESELECTIONNER_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true,
        errorPreselection: false,
        successPreselection: false
      };
    case 'PRESELECTIONNER_CONSEILLER_SUCCESS':
      return {
        ...state,
        loading: false,
        successPreselection: action.success,
      };
    case 'PRESELECTIONNER_CONSEILLER_FAILURE':
      return {
        ...state,
        errorPreselection: action.error,
        loading: false
      };
    case 'RESET_SUCCESS_PRESELECTION':
      return {
        ...state,
        successPreselection: false
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
        successDeleteCandidat: false,
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
    case 'VALIDATION_RUPTURE_REQUEST':
      return {
        ...state,
        loading: true,
        errorRupture: false
      };
    case 'VALIDATION_RUPTURE_SUCCESS':
      return {
        ...state,
        loading: false,
        conseillerContrat: {
          ...state.conseillerContrat,
          emailPro: '',
          telephonePro: '',
          statut: 'RUPTURE',
          mattermost: '',
          contrat: action.miseEnRelationUpdated,
          misesEnRelation: state.conseillerContrat?.misesEnRelation?.map(
            miseEnRelation => (miseEnRelation._id === action.miseEnRelationUpdated._id) ? action.miseEnRelationUpdated : miseEnRelation
          ),
          permanences: []
        },
        conseiller: {
          ...action.miseEnRelationUpdated.conseillerObj,
          emailPro: '',
          telephonePro: '',
          statut: 'RUPTURE',
          mattermost: '',
          misesEnRelation: state.conseiller?.misesEnRelation?.map(
            miseEnRelation => (miseEnRelation._id === action.miseEnRelationUpdated._id) ? action.miseEnRelationUpdated : miseEnRelation
          ),
          permanences: []
        }
      };
    case 'VALIDATION_RUPTURE_FAILURE':
      return {
        ...state,
        loading: false,
        errorRupture: action.error
      };
    case 'DOSSIER_INCOMPLET_RUPTURE_REQUEST':
      return {
        ...state,
        loading: true,
        errorRupture: false
      };
    case 'DOSSIER_INCOMPLET_RUPTURE_SUCCESS':
      return {
        ...state,
        dossierIncompletRupture: action.dossierIncompletRupture,
        loading: false
      };
    case 'DOSSIER_INCOMPLET_RUPTURE_FAILURE':
      return {
        ...state,
        loading: false,
        errorRupture: action.error
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
    case 'UPDATE_MISE_EN_RELATION_CONTRAT':
      return {
        ...state,
        conseillerContrat: {
          ...state.conseillerContrat,
          contrat: action.miseEnRelationUpdated,
          misesEnRelation: state.conseillerContrat.misesEnRelation.map(
            miseEnRelation => (miseEnRelation.statut === action.miseEnRelationUpdated.statut) ? action.miseEnRelationUpdated : miseEnRelation
          )
        },
      };
    case 'RESUBMIT_INVITATION_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true,
        errorRelanceInvitation: false,
        successRelanceInvitation: false,
      };
    case 'RESUBMIT_INVITATION_CONSEILLER_SUCCESS':
      return {
        ...state,
        loading: false,
        successRelanceInvitation: action.successRelanceInvitation,
      };
    case 'RESUBMIT_INVITATION_CONSEILLER_FAILURE':
      return {
        ...state,
        loading: false,
        errorRelanceInvitation: action.error,
      };
    default:
      return state;
  }
}
