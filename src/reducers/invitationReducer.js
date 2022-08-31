export default function menu(state = [], action) {
  switch (action.type) {
    case 'INVITING_PREFET_REQUEST':
      return {
        invitingAccountsPrefet: true
      };
    case 'INVITING_PREFET_SUCCESS':
      return {
        accountsPrefetInvited: true,
        user: action.user
      };
    case 'INVITING_PREFET_FAILURE':
      return {
        accountsPrefetInvited: false,
        error: action.error
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
    default:
      return state;
  }
}
