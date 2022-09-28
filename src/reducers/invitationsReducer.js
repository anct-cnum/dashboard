const initState = {
  loading: false,
  success: false,
  error: false
};
export default function invitations(state = initState, action) {
  switch (action.type) {
    case 'INVITING_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'INVITING_PREFET_SUCCESS':
      return {
        ...state,
        loading: false,
        success: action.successInvitePrefet,
      };
    case 'INVITING_PREFET_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'INVITING_ADMIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'INVITING_ADMIN_SUCCESS':
      return {
        loading: false,
        success: action.successInviteAdmin
      };
    case 'INVITING_ADMIN_FAILURE':
      return {
        loading: false,
        error: action.error,
      };
    case 'INVITING_STRUCTURE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'INVITING_STRUCTURE_SUCCESS':
      return {
        loading: false,
        success: action.successInviteAccountMulticompteSA,
      };
    case 'INVITING_STRUCTURE_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'INVITING_HUB_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'INVITING_HUB_SUCCESS':
      return {
        loading: false,
        success: action.successInviteHub
      };
    case 'INVITING_HUB_FAILURE':
      return {
        loading: false,
        error: action.error,
      };
    case 'RESET_INVITATION':
      return {
        ...initState
      };
    default:
      return state;
  }
}
