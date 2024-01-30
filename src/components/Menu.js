import React, { useEffect, useState } from 'react';
import { menuActions } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import UserMenu from './UserMenu';
import PropTypes from 'prop-types';
import MenuAdmin from './menuRole/MenuAdmin';
import MenuStructure from './menuRole/MenuStructure';
import MenuPrefet from './menuRole/MenuPrefet';
import MenuGrandReseau from './menuRole/MenuGrandReseau';
import MenuHub from './menuRole/MenuHub';
import MenuCoordinateur from './menuRole/MenuCoordinateur';

function Menu(
  {
    user,
    changeRoleActivated,
    auth,
    roles,
    clickButtonLogout
  }
) {

  const dispatch = useDispatch();
  const location = useLocation();
  const { trackEvent } = useMatomo();

  const urlAide = `${process.env.REACT_APP_AIDE_HOSTNAME}/category/tableau-de-pilotage-1i6u8in`;

  const burgerMenuHidden = useSelector(state => state.menu?.hiddenBurgerMenu);
  const [activeMenu, setActiveMenu] = useState(null);
  const [changedMenu, setIsChangedMenu] = useState(false);

  const roleActivated = useSelector(state => state.authentication?.roleActivated);

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
        <div className="fr-header__menu-links display-desktop"></div>
        <button className="fr-link--close fr-link" aria-controls="modal-870" onClick={toggleBurgerMenu}>Fermer</button>
        {/Android|iPhone|iPad/i.test(navigator.userAgent) &&
          <UserMenu
            user={user}
            roleActivated={roleActivated}
            roles={roles}
            changeRoleActivated={changeRoleActivated}
            auth={auth}
            clickButtonLogout={clickButtonLogout}
          />
        }
        <nav className="fr-nav fr-display--none-lg" id="navigation-869" role="navigation" aria-label="Menu principal">
          <ul className="fr-nav__list">
            {roleActivated === 'admin' &&
              <MenuAdmin onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
            }
            {roleActivated === 'structure' &&
              <MenuStructure onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
            }
            {roleActivated === 'prefet' &&
              <MenuPrefet onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
            }
            {roleActivated === 'grandReseau' &&
              <MenuGrandReseau onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
            }
            {roleActivated === 'hub_coop' &&
              <MenuHub onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
            }
            {roleActivated === 'coordinateur' &&
              <MenuCoordinateur onClickMenu={onClickMenu} activeMenu={activeMenu} trackEvent={trackEvent} />
            }
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
                aria-expanded={activeMenu === 'recrutement'}
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
                aria-expanded={activeMenu === 'aide'}
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

Menu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  changeRoleActivated: PropTypes.func,
  clickButtonLogout: PropTypes.func,
  auth: PropTypes.object,
  roles: PropTypes.array,
  structure: PropTypes.object,
};

export default Menu;
