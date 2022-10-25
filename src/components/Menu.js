import React, { useEffect, useState } from 'react';
import { menuActions } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

function Menu() {

  const dispatch = useDispatch();
  const location = useLocation();
  
  const urlAide = process.env.REACT_APP_AIDE_HOSTNAME;
  const rolesStatistiquesStructures = ['admin', 'prefet', 'hub_coop', 'grandReseau'];

  const burgerMenuHidden = useSelector(state => state.menu?.hiddenBurgerMenu);
  const [activeMenu, setActiveMenu] = useState(null);
  const [changedMenu, setIsChangedMenu] = useState(false);

  const roleActivated = useSelector(state => state.authentication.roleActivated);
  const authenticationUser = useSelector(state => state.authentication?.user?.entity?.$id);

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
              <Link
                to={`${roleActivated}/informations`}
                className="fr-nav__link"
                {...(location.pathname.startsWith(`/${roleActivated}/informations`) ? { 'aria-current': 'page' } : {})}>
                  Mes informations
              </Link>
            </li>
            <li className="fr-nav__item">
              <button
                id="listes"
                className="fr-nav__btn"
                aria-expanded={ activeMenu === 'listes' }
                aria-controls="menu-listes"
                // eslint-disable-next-line max-len
                {...(location.pathname.startsWith(`/liste-conseillers`) || location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) ? { 'aria-current': 'page' } : {})}
                onClick={onClickMenu}>
                  Suivis
              </button>
              <div className={`fr-collapse fr-menu ${activeMenu === 'listes' ? 'fr-collapse--expanded' : ''}`} id="menu-listes">
                <ul className="fr-menu__list">
                  { (roleActivated === 'structure' || roleActivated === 'admin') &&
                  <li>
                    <Link className="fr-nav__link" to={`/${roleActivated}/candidats/nouvelle`}
                      {...(location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) ? { 'aria-current': 'page' } : {})}>
                      Liste des candidatures
                    </Link>
                  </li>
                  }
                  <li>
                    <Link className="fr-nav__link" to="liste-conseillers"
                      {...(location.pathname.startsWith(`/liste-conseillers`) ? { 'aria-current': 'page' } : {})}>
                      Liste des conseillers
                    </Link>
                  </li>
                  {roleActivated !== 'structure' &&
                  <li>
                    <Link className="fr-nav__link" to={`/${roleActivated}/liste-structures`}
                      {...(location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}>
                      Liste des structures
                    </Link>
                  </li>
                  }
                </ul>
              </div>
            </li>
            <li className="fr-nav__item">
              <button
                id="statistiques"
                className="fr-nav__btn"
                aria-expanded={ activeMenu === 'statistiques' }
                aria-controls="menu-statistiques"
                onClick={onClickMenu}>
                  Statistiques
              </button>
              <div className={`fr-collapse fr-menu ${activeMenu === 'statistiques' ? 'fr-collapse--expanded' : ''}`} id="menu-statistiques">
                <ul className="fr-menu__list">
                  <li>
                    <Link className="fr-nav__link" to={`/statistiques-nationales`}
                      {...(location.pathname.startsWith(`/statistiques-nationales`) ? { 'aria-current': 'page' } : {})}>
                      &bull;&nbsp;Statistiques nationales
                    </Link>
                  </li>
                  <li>
                    <Link className="fr-nav__link" to="/statistiques-territoires"
                      {...(location.pathname.startsWith(`/statistiques-territoires`) ? { 'aria-current': 'page' } : {})}>
                        &bull;&nbsp;Statistiques par territoire
                    </Link>
                  </li>
                  {(rolesStatistiquesStructures.includes(roleActivated)) &&
                  <li>
                    <Link className="fr-nav__link" to="/statistiques-structures"
                      {...(location.pathname.startsWith(`/statistiques-structures`) ? { 'aria-current': 'page' } : {})}>
                      &bull;&nbsp;Statistiques par structure
                    </Link>
                  </li>
                  }
                  {roleActivated === 'structure' &&
                  <li>
                    <Link className="fr-nav__link" to={`/statistiques-structure/${authenticationUser}`}
                      {...(location.pathname.startsWith(`/statistiques-structure`) ? { 'aria-current': 'page' } : {})}>
                      &bull;&nbsp;Mes Statistiques structure
                    </Link>
                  </li>
                  }
                </ul>
              </div>
            </li>
            <li className="fr-nav__item">
              <Link
                to={`${roleActivated}/exports`}
                className="fr-nav__link"
                {...(location.pathname.startsWith(`/${roleActivated}/exports`) ? { 'aria-current': 'page' } : {})}>
                Exports
              </Link>
            </li>
            <li className="fr-nav__item">
              <button
                id="recrutement"
                className="fr-nav__btn"
                aria-expanded={ activeMenu === 'recrutement' }
                aria-controls="menu-recrutement"
                {...(location.pathname.startsWith(`/certifications`) || location.pathname.startsWith(`/formation`) ? { 'aria-current': 'page' } : {})}
                onClick={onClickMenu}>
                  Infos recrutement
              </button>
              <div className={`fr-collapse fr-menu ${activeMenu === 'recrutement' ? 'fr-collapse--expanded' : ''}`} id="menu-recrutement">
                <ul className="fr-menu__list">
                  <li>
                    <Link
                      className="fr-nav__link"
                      to="/formation"
                      {...(location.pathname.startsWith(`/formation`) ? { 'aria-current': 'page' } : {})}>
                      &bull;&nbsp;Inscription en formation
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-nav__link"
                      to="/certifications"
                      {...(location.pathname.startsWith(`/certifications`) ? { 'aria-current': 'page' } : {})}>
                        &bull;&nbsp;Certifications
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="fr-nav__item">
              <Link
                to={`/documents`}
                className="fr-nav__link"
                {...(location.pathname.startsWith(`/documents`) ? { 'aria-current': 'page' } : {})}>
                  Documents
              </Link>
            </li>
            <li className="fr-nav__item">
              <button
                id="aide"
                className="fr-nav__btn"
                aria-expanded={ activeMenu === 'aide' }
                aria-controls="menu-aide"
                onClick={onClickMenu}>
                  Aide
              </button>
              <div className={`fr-collapse fr-menu ${activeMenu === 'aide' ? 'fr-collapse--expanded' : ''}`} id="menu-aide">
                <ul className="fr-menu__list">
                  <li>
                    <a className="fr-nav__link" href={urlAide} target="blank" rel="noreferrer noopener">
                      &bull;&nbsp;FAQ
                    </a>
                  </li>
                  <li>
                    <a className="fr-nav__link" href="mailto:conseiller-numerique@anct.gouv.fr">
                      &bull;&nbsp;Nous contacter
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* Exemple conservé pour les aria-current notamment
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
            */}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
