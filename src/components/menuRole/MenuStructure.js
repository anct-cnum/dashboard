import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuStructure({ onClickMenu, activeMenu, trackEvent }) {
  const authenticationUser = useSelector(state => state.authentication?.user?.entity?.$id);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const urlSiteVitrine = import.meta.env.VITE_APP_PUBLIC_HOSTNAME;

  return (
    <>
      <li className="fr-nav__item">
        <Link
          to={`${roleActivated}/postes`}
          className="fr-nav__link"
          {...(location.pathname.startsWith(`/${roleActivated}/postes`) ? { 'aria-current': 'page' } : {})}>
          G&eacute;rer mes postes
        </Link>
      </li>
      <li className="fr-nav__item">
        <button
          id="listes"
          className="fr-nav__btn"
          aria-expanded={activeMenu === 'listes'}
          aria-controls="menu-listes"
          // eslint-disable-next-line max-len
          {...(location.pathname.startsWith(`/${roleActivated}/liste-conseillers`) || location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) || location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Suivis
        </button>
        <div className={`fr-collapse fr-menu ${activeMenu === 'listes' ? 'fr-collapse--expanded' : ''}`} id="menu-listes">
          <ul className="fr-menu__list">
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/candidats/nouvelle`}
                {...(location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'liste-candidatures', action: `click-${roleActivated}` })}
              >
                Liste des candidatures
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/liste-conseillers`}
                {...(location.pathname.startsWith(`/${roleActivated}/liste-conseillers`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'liste-conseillers', action: `click-${roleActivated}` })}
              >
                Liste des conseillers
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
          {...(location.pathname.startsWith(`/${roleActivated}/recrutement-coordinateur`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Coordination territoriale
        </button>
        <div
          className={`fr-collapse fr-menu ${activeMenu === 'coordination-territoriale' ? 'fr-collapse--expanded' : ''}`}
          id="menu-coordination-territoriale"
        >
          <ul className="fr-menu__list" style={{ width: '23rem' }}>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/recrutement-coordinateur`}
                {...(location.pathname.startsWith(`/${roleActivated}/recrutement-coordinateur`) ? { 'aria-current': 'page' } : {})}
              >
                Recrutement d&rsquo;un coordinateur
              </Link>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${urlSiteVitrine}/coordination-territoriale`}
                className="fr-nav__link external-link"
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
          // eslint-disable-next-line max-len
          {...(location.pathname.startsWith(`/statistiques-nationales`) || location.pathname.startsWith(`/statistiques-territoires`) || location.pathname.startsWith(`/statistiques-structure/${authenticationUser}`) ? { 'aria-current': 'page' } : {})}
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
                Statistiques nationales du dispositif
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/nouvelles-statistiques`}
                {...(location.pathname.startsWith(`/nouvelles-statistiques`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: '/nouvelles-statistiques', action: `click-${roleActivated}` })}
              >
                Statistiques depuis le 15/11/2024
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to="/statistiques-territoires"
                {...(location.pathname.startsWith(`/statistiques-territoires`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'statistiques-territoriales', action: `click-${roleActivated}` })}
              >
                Statistiques territoriales du dispositif
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/statistiques-structure/${authenticationUser}`}
                {...(location.pathname.startsWith(`/statistiques-structure`) ? { 'aria-current': 'page' } : {})}>
                Mes statistiques structure
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
}

MenuStructure.propTypes = {
  onClickMenu: PropTypes.func,
  activeMenu: PropTypes.string,
  trackEvent: PropTypes.func,
};

export default MenuStructure;
