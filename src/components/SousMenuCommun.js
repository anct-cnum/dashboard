import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function SousMenuCommun({
  onClickMenu,
  activeMenu,
  roleActivated
}) {
  const urlAide = `${process.env.REACT_APP_AIDE_HOSTNAME}/category/tableau-de-pilotage-1i6u8in`;
  return (
    <>
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
    </>
  );
}

SousMenuCommun.propTypes = {
  onClickMenu: PropTypes.func,
  activeMenu: PropTypes.string,
  roleActivated: PropTypes.string,
};

export default SousMenuCommun;
