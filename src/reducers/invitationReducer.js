const initState = {
  loading: false,
  success: false,
  error: false
};
export default function invitation(state = initState, action) {
  switch (action.type) {
    case 'INVITING_PREFET_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'INVITING_PREFET_SUCCESS':
      return {
        ...state,
        loading: false,
        success: action.succesInvitePrefet,
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
        loading: true
      };
    case 'INVITING_ADMIN_SUCCESS':
      return {
        loading: false,
        success: action.succesInviteAdmin
      };
    case 'INVITING_ADMIN_FAILURE':
      return {
        loading: false,
        error: action.error,
      };
    case 'INVITING_STRUCTURE_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'INVITING_STRUCTURE_SUCCESS':
      return {
        loading: false,
        success: action.succesInviteAccountMulticompteSA,
      };
    case 'INVITING_STRUCTURE_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'RESET_INVITATION':
      return {
        sucess: false,
        error: false,
      };
    default:
      return state;
  }
}
