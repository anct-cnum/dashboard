const initialState = {
  hiddenBurgerMenu: true,
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_BURGER_MENU':
      return {
        ...state,
        hiddenBurgerMenu: !state.hiddenBurgerMenu,
      };
    default:
      return state;
  }
}
