import { invitationService } from '../services/invitationService';

export const InvitationActions = {
  inviteAccountPrefet,
  inviteAccountAdmin,
  inviteStructure,
  resetInvitation
};
function inviteAccountPrefet(emails, niveau) {
  return dispatch => {
    dispatch(request());
  
    invitationService.inviteAccountPrefet(emails, niveau)
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
  
    invitationService.inviteAccountAdmin(email)
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

function inviteStructure(body) {
  return dispatch => {
    dispatch(request());
  
    invitationService.inviteStructure(body)
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
