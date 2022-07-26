import React, { useEffect, useState } from 'react';
import { menuActions } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

function Menu() {

  const dispatch = useDispatch();
  const location = useLocation();

  const burgerMenuHidden = useSelector(state => state.menu?.hiddenBurgerMenu);
  const [activeMenu, setActiveMenu] = useState(null);
  const [changedMenu, setIsChangedMenu] = useState(false);

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleBurgerMenu());
  };

  //Fermeture du burger menu et fermeture des menus ouverts au changement de route
  useEffect(() => {
    if (burgerMenuHidden === false) {
      dispatch(menuActions.toggleBurgerMenu());
    }
    setActiveMenu(null);
  }, [location.pathname]);

  //Trick pour contourner la mauvaise gestion du DSFR pour les menus d&eacute;roulants
  useEffect(() => {
    if (changedMenu !== false) {
      setTimeout(() => {
        setActiveMenu(changedMenu);
        setIsChangedMenu(false);
      }, 60);
    }
  }, [changedMenu]);

  const onClickMenu = e => {
    setIsChangedMenu(e.target?.id);
  };

  return (
    <div className={`fr-header__menu ${burgerMenuHidden ? 'fr-modal' : ''}`} id="modal-870" aria-labelledby="fr-btn-menu-mobile-4">
      <div className="fr-container">
        <button className="fr-link--close fr-link" aria-controls="modal-870" onClick={toggleBurgerMenu}>Fermer</button>
        <div className="fr-header__menu-links"></div>
        <nav className="fr-nav fr-display--none-lg" id="navigation-869" role="navigation" aria-label="Menu principal">
          <ul className="fr-nav__list">
            <li className="fr-nav__item">
              <button
                id="documents"
                className="fr-nav__btn"
                aria-expanded={ activeMenu === 'documents' }
                aria-controls="menu-documents"
                onClick={onClickMenu}
                {...(location.pathname.startsWith('/documents') || location.pathname === '/' ? { 'aria-current': true } : {})}>
                  Test sous menu
              </button>
              <div className={`fr-collapse fr-menu ${activeMenu === 'documents' ? 'fr-collapse--expanded' : ''}`} id="menu-documents">
                <ul className="fr-menu__list">
                  <li>
                    <Link
                      to="/"
                      className="fr-nav__link"
                      {...(location.pathname === '/' ? { 'aria-current': 'page' } : {})}>
                      &bull;&nbsp;Accueil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/documents"
                      className="fr-nav__link"
                      {...(location.pathname.startsWith('/documents') ? { 'aria-current': 'page' } : {})}>
                      &bull;&nbsp;Mes documents
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
