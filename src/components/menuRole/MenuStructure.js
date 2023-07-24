import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MenuStructure(onClickMenu, activeMenu, trackEvent, roleActivated) {
  const authenticationUser = useSelector(state => state.authentication?.user?.entity?.$id);

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
          {...(location.pathname.startsWith(`/liste-conseillers`) || location.pathname.startsWith(`/${roleActivated}/candidats/nouvelle`) || location.pathname.startsWith(`/${roleActivated}/liste-structures`) ? { 'aria-current': 'page' } : {})}
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
              <Link className="fr-nav__link" to="liste-conseillers"
                {...(location.pathname.startsWith(`/liste-conseillers`) ? { 'aria-current': 'page' } : {})}
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
          disabled
          id="coordination-territoriale"
          className="fr-nav__btn"
          aria-expanded={activeMenu === 'coordination-territoriale'}
          aria-controls="menu-coordination-territoriale"
          // eslint-disable-next-line max-len
          {...(location.pathname.startsWith(`/${roleActivated}/demandes/conventions`) || location.pathname.startsWith(`/${roleActivated}/historique/demandes/conventions`) || location.pathname.startsWith(`/${roleActivated}/historique/demandes/contrats`) || location.pathname.startsWith(`/${roleActivated}/historique/demandes/contrats`) ? { 'aria-current': 'page' } : {})}
          onClick={onClickMenu}>
          Coordination territoriale
        </button>
        <div
          className={`fr-collapse fr-menu ${activeMenu === 'coordination-territoriale' ? 'fr-collapse--expanded' : ''}`}
          id="menu-coordination-territoriale"
        >
          <ul className="fr-menu__list" style={{ width: '23rem' }}>
            <li>
              <Link className="fr-nav__link" to="liste-conseillers"
                {...(location.pathname.startsWith(`/liste-conseillers`) ? { 'aria-current': 'page' } : {})}
                onClick={() => trackEvent({ category: 'liste-conseillers', action: `click-${roleActivated}` })}
              >
                Recrutement d&rsquo;un coordinateur
              </Link>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://beta.www.conseiller-numerique.gouv.fr/coordination-territoriale"
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
            <li>
              <Link className="fr-nav__link" to={`/statistiques-structure/${authenticationUser}`}
                {...(location.pathname.startsWith(`/statistiques-structure`) ? { 'aria-current': 'page' } : {})}>
                &bull;&nbsp;Mes statistiques structure
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
}
