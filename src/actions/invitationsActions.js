import { invitationsService } from '../services/invitationsService';

export const InvitationsActions = {
  inviteAccountPrefet,
  inviteAccountAdmin,
  inviteStructure,
  resetInvitation
};
function inviteAccountPrefet(email, maille) {
  return dispatch => {
    dispatch(request());
  
    invitationsService.inviteAccountPrefet(email, maille)
    .then(
      succesInvitePrefet => {
        dispatch(success(succesInvitePrefet));
      },
      error => dispatch(failure(error)));
  };
  
  function request() {
    return { type: 'INVITING_PREFET_REQUEST' };
  }
  function success(succesInvitePrefet) {
    return { type: 'INVITING_PREFET_SUCCESS', succesInvitePrefet };
  }
  function failure(error) {
    return { type: 'INVITING_PREFET_FAILURE', error };
  }
}

function inviteAccountAdmin(email) {
  return dispatch => {
    dispatch(request());
  
    invitationsService.inviteAccountAdmin(email)
    .then(
      succesInviteAdmin => {
        dispatch(success(succesInviteAdmin));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'INVITING_ADMIN_REQUEST' };
  }
  function success(succesInviteAdmin) {
    return { type: 'INVITING_ADMIN_SUCCESS', succesInviteAdmin };
  }
  function failure(error) {
    return { type: 'INVITING_ADMIN_FAILURE', error };
  }
}

function inviteStructure({ email, structureId }) {
  return dispatch => {
    dispatch(request());
  
    invitationsService.inviteStructure({ email, structureId })
    .then(
      succesInviteAccountMulticompteSA => {
        dispatch(success(succesInviteAccountMulticompteSA));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'INVITING_STRUCTURE_REQUEST' };
  }
  function success(succesInviteAccountMulticompteSA) {
    return { type: 'INVITING_STRUCTURE_SUCCESS', succesInviteAccountMulticompteSA };
  }
  function failure(error) {
    return { type: 'INVITING_STRUCTURE_FAILURE', error };
  }
}


function resetInvitation() {
  return { type: 'RESET_INVITATION' };
}
