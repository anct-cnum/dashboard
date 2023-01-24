import React, { useEffect, useState } from 'react';
import { menuActions } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';

function Menu() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { trackEvent } = useMatomo();
  
  const urlAide = `${process.env.REACT_APP_AIDE_HOSTNAME}/category/tableau-de-pilotage-1i6u8in`;

  const burgerMenuHidden = useSelector(state => state.menu?.hiddenBurgerMenu);
  const [activeMenu, setActiveMenu] = useState(null);
  const [changedMenu, setIsChangedMenu] = useState(false);

  const roleActivated = useSelector(state => state.authentication?.roleActivated);
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
            { roleActivated === 'admin' &&
            <li className="fr-nav__item">
              <button
                id="listes-traitement-demandes"
                className="fr-nav__btn"
                aria-expanded={ activeMenu === 'listes-traitement-demandes' }
                aria-controls="menu-listes-traitement-demandes"
                // eslint-disable-next-line max-len
                {...(location.pathname.startsWith(`/${roleActivated}/demandes/conventions`) || location.pathname.startsWith(`/${roleActivated}/demandes/contrats`) ? { 'aria-current': 'page' } : {})}
                onClick={onClickMenu}>
                  Traiter les demandes
              </button>
              <div
                className={`fr-collapse fr-menu ${activeMenu === 'listes-traitement-demandes' ? 'fr-collapse--expanded' : ''}`}
                id="menu-listes-traitement-demandes"
              >
                <ul className="fr-menu__list">
                  <li>
                    <Link className="fr-nav__link" to={`/${roleActivated}/demandes/conventions`}
                      {...(location.pathname.startsWith(`/${roleActivated}/demandes/conventions`) ? { 'aria-current': 'page' } : {})}>
                      Demandes de conventions à traiter
                    </Link>
                  </li>
                  <li>
                    <Link className="fr-nav__link" to={`/${roleActivated}/demandes/contrats`}
                      {...(location.pathname.startsWith(`/${roleActivated}/demandes/contrats`) ? { 'aria-current': 'page' } : {})}>
                      Demandes de contrats à traiter
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            }
            <li className="fr-nav__item">
              <button
                id="listes"
                className="fr-nav__btn"
                aria-expanded={ activeMenu === 'listes' }
                aria-controls="menu-listes"
                // eslint-disable-next-line max-len
                {...(location.pathname.startsWith(`/liste-conseillers`) || location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) || location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}
                onClick={onClickMenu}>
                  Suivis
              </button>
              <div className={`fr-collapse fr-menu ${activeMenu === 'listes' ? 'fr-collapse--expanded' : ''}`} id="menu-listes">
                <ul className="fr-menu__list">
                  { roleActivated === 'structure' &&
                  <li>
                    <Link className="fr-nav__link" to={`/${roleActivated}/candidats/nouvelle`}
                      {...(location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) ? { 'aria-current': 'page' } : {})}>
                      Liste des candidatures
                    </Link>
                  </li>
                  }
                  { roleActivated === 'admin' &&
                  <li>
                    <Link className="fr-nav__link" to={`/${roleActivated}/liste-candidatures`}
                      {...(location.pathname.startsWith(`/${roleActivated}/liste-candidatures`) ? { 'aria-current': 'page' } : {})}
                      onClick={() => trackEvent({ category: 'liste-candidatures', action: `click-${roleActivated}` })}
                    >
                      Liste des candidatures
                    </Link>
                  </li>
                  }
                  <li>
                    <Link className="fr-nav__link" to="liste-conseillers"
                      {...(location.pathname.startsWith(`/liste-conseillers`) ? { 'aria-current': 'page' } : {})}
                      onClick={() => trackEvent({ category: 'liste-conseillers', action: `click-${roleActivated}` })}
                    >
                      Liste des conseillers
                    </Link>
                  </li>
                  {roleActivated !== 'structure' &&
                  <li>
                    <Link className="fr-nav__link" to={`/${roleActivated}/liste-structures`}
                      {...(location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}
                      onClick={() => trackEvent({ category: 'liste-structures', action: `click-${roleActivated}` })}
                    >
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
                      &bull;&nbsp;Statistiques nationales du dispositif
                    </Link>
                  </li>
                  <li>
                    <Link className="fr-nav__link" to="/statistiques-territoires"
                      {...(location.pathname.startsWith(`/statistiques-territoires`) ? { 'aria-current': 'page' } : {})}>
                        &bull;&nbsp;Statistiques territoriales du dispositif
                    </Link>
                  </li>
                  {roleActivated === 'structure' &&
                  <li>
                    <Link className="fr-nav__link" to={`/statistiques-structure/${authenticationUser}`}
                      {...(location.pathname.startsWith(`/statistiques-structure`) ? { 'aria-current': 'page' } : {})}>
                      &bull;&nbsp;Mes statistiques structure
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
                  Formation / Certification
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
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
