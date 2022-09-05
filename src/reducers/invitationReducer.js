const initState = {
  succesInvitPrefet: null,
  errorInvitPrefet: null,
  loadingAccountPrefet: null
};
export default function invitation(state = initState, action) {
  switch (action.type) {
    case 'INVITING_PREFET_REQUEST':
      return {
        ...state,
        loadingAccountPrefet: true,
        succesInvitPrefet: null,
        errorInvitPrefet: null,
      };
    case 'INVITING_PREFET_SUCCESS':
      return {
        ...state,
        loadingAccountPrefet: false,
        succesInvitPrefet: action.succesInvitePrefet,
      };
    case 'INVITING_PREFET_FAILURE':
      return {
        ...state,
        loadingAccountPrefet: false,
        errorInvitPrefet: action.error,
      };
    case 'INVITING_ADMIN_REQUEST':
      return {
        invitingAccountAdmin: true
      };
    case 'INVITING_ADMIN_SUCCESS':
      return {
        accountAdminInvited: true,
        user: action.user
      };
    case 'INVITING_ADMIN_FAILURE':
      return {
        accountAdminInvited: false,
        error: action.error
      };
    case 'INVITING_MULTICOMPTE_STRUCTURE_REQUEST':
      return {
        invitingAccountMulticompteStructure: true
      };
    case 'INVITING_MULTICOMPTE_STRUCTURE_SUCCESS':
      return {
        accountMulticompteStructureInvited: true,
        user: action.user
      };
    case 'INVITING_MULTICOMPTE_STRUCTURE_FAILURE':
      return {
        accountMulticompteStructureInvited: false,
        error: action.error
      };
    case 'RESET_INVITATION':
      return {
        succesInvitPrefet: null,
        errorInvitPrefet: null,
        loadingAccountPrefet: null
      };
    default:
      return state;
  }
}
