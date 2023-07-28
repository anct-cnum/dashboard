import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuHub({ onClickMenu, activeMenu, trackEvent }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <li className="fr-nav__item">
        <button
          id="listes"
          className="fr-nav__btn"
          aria-expanded={activeMenu === 'listes'}
          aria-controls="menu-listes"
          // eslint-disable-next-line max-len
          {...(location.pathname.startsWith(`/liste-conseillers`) || location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) || location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Suivis
        </button>
        <div className={`fr-collapse fr-menu ${activeMenu === 'listes' ? 'fr-collapse--expanded' : ''}`} id="menu-listes">
          <ul className="fr-menu__list">
            <li>
              <Link className="fr-nav__link" to="liste-conseillers"
                {...(location.pathname.startsWith(`/liste-conseillers`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'liste-conseillers', action: `click-${roleActivated}` })}
              >
                Liste des conseillers
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/liste-structures`}
                {...(location.pathname.startsWith(`/liste-structures`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'liste-structures', action: `click-${roleActivated}` })}
              >
                Liste des structures
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="fr-nav__item">
        <button
          id="statistiques"
          className="fr-nav__btn"
          aria-expanded={activeMenu === 'statistiques'}
          aria-controls="menu-statistiques"
          // eslint-disable-next-line max-len
          {...(location.pathname.startsWith(`/statistiques-nationales`) || location.pathname.startsWith(`/statistiques-territoires`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Statistiques
        </button>
        <div className={`fr-collapse fr-menu ${activeMenu === 'statistiques' ? 'fr-collapse--expanded' : ''}`} id="menu-statistiques">
          <ul className="fr-menu__list">
            <li>
              <Link className="fr-nav__link" to={`/statistiques-nationales`}
                {...(location.pathname.startsWith(`/statistiques-nationales`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'statistiques-nationales', action: `click-${roleActivated}` })}
              >
                &bull;&nbsp;Statistiques nationales du dispositif
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to="/statistiques-territoires"
                {...(location.pathname.startsWith(`/statistiques-territoires`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'statistiques-territoriales', action: `click-${roleActivated}` })}
              >
                &bull;&nbsp;Statistiques territoriales du dispositif
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
}

MenuHub.propTypes = {
  onClickMenu: PropTypes.func,
  activeMenu: PropTypes.string,
  trackEvent: PropTypes.func,
};

export default MenuHub;
