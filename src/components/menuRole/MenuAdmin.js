import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuAdmin({ onClickMenu, activeMenu, trackEvent }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <li className="fr-nav__item">
        <button
          id="listes-traitement-demandes"
          className="fr-nav__btn"
          aria-expanded={activeMenu === 'listes-traitement-demandes'}
          aria-controls="menu-listes-traitement-demandes"
          // eslint-disable-next-line max-len
          {...(location.pathname.startsWith(`/${roleActivated}/demandes/conventions`) || location.pathname.startsWith(`/${roleActivated}/historique/demandes/conventions`) || location.pathname.startsWith(`/${roleActivated}/historique/demandes/contrats`) || location.pathname.startsWith(`/${roleActivated}/historique/demandes/contrats`) || location.pathname.startsWith(`/${roleActivated}/demandes/coordinateurs`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Traiter les demandes
        </button>
        <div
          className={`fr-collapse fr-menu ${activeMenu === 'listes-traitement-demandes' ? 'fr-collapse--expanded' : ''}`}
          id="menu-listes-traitement-demandes"
        >
          <ul className="fr-menu__list" style={{ width: '23rem' }}>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/demandes/conventions`}
                {...(location.pathname.startsWith(`/${roleActivated}/demandes/conventions`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'demande-conventions', action: `click-${roleActivated}` })}
              >
                Demandes de conventions &agrave; traiter
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/historique/demandes/conventions`}
                {...(location.pathname.startsWith(`/${roleActivated}/historique/demandes/conventions`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'historique-demande-conventions', action: `click-${roleActivated}` })}
              >
                Historique des demandes de conventions trait&eacute;es
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/demandes/contrats`}
                {...(location.pathname.startsWith(`/${roleActivated}/demandes/contrats`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'demande-contrats', action: `click-${roleActivated}` })}
              >
                Demandes de contrats &agrave; traiter
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/historique/demandes/contrats`}
                {...(location.pathname.startsWith(`/${roleActivated}/historique/demandes/contrats`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'historique-demande-contrats', action: `click-${roleActivated}` })}
              >
                Historique des demandes de contrats trait&eacute;es
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/demandes/coordinateurs`}
                {...(location.pathname.startsWith(`/${roleActivated}/demandes/coordinateurs`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'demande-coordinateur', action: `click-${roleActivated}` })}
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
          {...(location.pathname.startsWith(`/${roleActivated}/liste-conseillers`) || location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) || location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Suivis
        </button>
        <div className={`fr-collapse fr-menu ${activeMenu === 'listes' ? 'fr-collapse--expanded' : ''}`} id="menu-listes">
          <ul className="fr-menu__list">
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/liste-candidatures`}
                {...(location.pathname.startsWith(`/${roleActivated}/liste-candidatures`) ? { 'aria-current': 'page' } : {})}
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
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/liste-structures`}
                {...(location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'liste-structures', action: `click-${roleActivated}` })}
              >
                Liste des structures
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/${roleActivated}/liste-gestionnaires`}
                {...(location.pathname.startsWith(`/${roleActivated}/liste-gestionnaires`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'liste-gestionnaires', action: `click-${roleActivated}` })}
              >
                Liste des gestionnaires
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
                Statistiques nationales du dispositif
              </Link>
            </li>
            <li>
              <Link className="fr-nav__link" to={`/statistiques-nouvelle-coop-nationales`}
                {...(location.pathname.startsWith(`/statistiques-nouvelle-coop-nationales`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: '/statistiques-nouvelle-coop-nationales', action: `click-${roleActivated}` })}
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
          </ul>
        </div>
      </li>
    </>
  );
}

MenuAdmin.propTypes = {
  onClickMenu: PropTypes.func,
  activeMenu: PropTypes.string,
  trackEvent: PropTypes.func,
};

export default MenuAdmin;
