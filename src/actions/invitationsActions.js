import { invitationsService } from '../services/invitationsService';

export const invitationsActions = {
  inviteAccountPrefet,
  inviteAccountAdmin,
  inviteStructure,
  resetInvitation,
  inviteAccountHub
};
function inviteAccountPrefet(email, maille) {
  return dispatch => {
    dispatch(request());
  
    invitationsService.inviteAccountPrefet(email, maille)
    .then(
      successInvitePrefet => {
        dispatch(success(successInvitePrefet));
      },
      error => dispatch(failure(error)));
  };
  
  function request() {
    return { type: 'INVITING_PREFET_REQUEST' };
  }
  function success(successInvitePrefet) {
    return { type: 'INVITING_PREFET_SUCCESS', successInvitePrefet };
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
      successInviteAdmin => {
        dispatch(success(successInviteAdmin));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'INVITING_ADMIN_REQUEST' };
  }
  function success(successInviteAdmin) {
    return { type: 'INVITING_ADMIN_SUCCESS', successInviteAdmin };
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
      successInviteAccountMulticompteSA => {
        dispatch(success(successInviteAccountMulticompteSA));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'INVITING_STRUCTURE_REQUEST' };
  }
  function success(successInviteAccountMulticompteSA) {
    return { type: 'INVITING_STRUCTURE_SUCCESS', successInviteAccountMulticompteSA };
  }
  function failure(error) {
    return { type: 'INVITING_STRUCTURE_FAILURE', error };
  }
}

function inviteAccountHub({ hub, nom, prenom, email }) {
  return dispatch => {
    dispatch(request());
  
    invitationsService.inviteAccountHub({ hub, nom, prenom, email })
    .then(
      successInviteHub => {
        dispatch(success(successInviteHub));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'INVITING_HUB_REQUEST' };
  }
  function success(successInviteHub) {
    return { type: 'INVITING_HUB_SUCCESS', successInviteHub };
  }
  function failure(error) {
    return { type: 'INVITING_HUB_FAILURE', error };
  }
}


function resetInvitation() {
  return { type: 'RESET_INVITATION' };
}
