import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuPrefet({ onClickMenu, activeMenu, trackEvent }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <li className="fr-nav__item">
        <button
          id="listes-traitement-demandes"
          disabled
          className="fr-nav__btn"
          aria-expanded={activeMenu === 'listes-traitement-demandes'}
          aria-controls="menu-listes-traitement-demandes"
          // eslint-disable-next-line max-len
          {...(location.pathname.startsWith(`/${roleActivated}/demandes/coordinateurs`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Traiter les demandes
        </button>
        <div
          className={`fr-collapse fr-menu ${activeMenu === 'listes-traitement-demandes' ? 'fr-collapse--expanded' : ''}`}
          id="menu-listes-traitement-demandes"
        >
          <ul className="fr-menu__list" style={{ width: '24rem' }}>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/demandes/coordinateurs`}
                {...(location.pathname.startsWith(`/${roleActivated}/demandes/coordinateurs`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'demande-coordinateurs', action: `click-${roleActivated}` })}
              >
                Demandes de coordinateurs &agrave; traiter
              </Link>
            </li>
          </ul>
        </div>
      </li>
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
          id="coordination-territoriale"
          className="fr-nav__btn"
          aria-expanded={activeMenu === 'coordination-territoriale'}
          aria-controls="menu-coordination-territoriale"
          onClick={onClickMenu}>
          Coordination territoriale
        </button>
        <div
          className={`fr-collapse fr-menu ${activeMenu === 'coordination-territoriale' ? 'fr-collapse--expanded' : ''}`}
          id="menu-coordination-territoriale"
        >
          <ul className="fr-menu__list" style={{ width: '23rem' }}>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.conseiller-numerique.gouv.fr/coordination-territoriale"
                className="fr-nav__link"
              >
                Les missions et la cartographie des coordinateurs
              </a>
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

MenuPrefet.propTypes = {
  onClickMenu: PropTypes.func,
  activeMenu: PropTypes.string,
  trackEvent: PropTypes.func,
};

export default MenuPrefet;
