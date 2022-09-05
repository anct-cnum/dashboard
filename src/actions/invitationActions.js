import { invitationService } from '../services/invitationService';

export const InvitationActions = {
  inviteAccountsPrefet,
  inviteAccountAdmin,
  inviteAccountMulticompteSA,
  resetInvitation
};
function inviteAccountsPrefet(emails, niveau) {
  return dispatch => {
    dispatch(request());
  
    invitationService.inviteAccountsPrefet(emails, niveau)
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
      () => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'INVITING_ADMIN_REQUEST' };
  }
  function success() {
    return { type: 'INVITING_ADMIN_SUCCESS' };
  }
  function failure(error) {
    return { type: 'INVITING_ADMIN_FAILURE', error };
  }
}

function inviteAccountMulticompteSA(email) {
  return dispatch => {
    dispatch(request());
  
    invitationService.inviteAccountMulticompteSA(email)
    .then(
      () => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'INVITING_MULTICOMPTE_STRUCTURE_REQUEST' };
  }
  function success() {
    return { type: 'INVITING_MULTICOMPTE_STRUCTURE_SUCCESS' };
  }
  function failure(error) {
    return { type: 'INVITING_MULTICOMPTE_STRUCTURE_FAILURE', error };
  }
}


function resetInvitation() {
  return { type: 'RESET_INVITATION' };
}
