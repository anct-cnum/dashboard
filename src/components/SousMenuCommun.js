import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function SousMenuCommun({
  onClickMenu,
  activeMenu,
  roleActivated
}) {
  const urlAide = `${process.env.REACT_APP_AIDE_HOSTNAME}/category/tableau-de-pilotage-1i6u8in`;
  const urlFormation = `${process.env.REACT_APP_PUBLIC_HOSTNAME}/formation`;
  const mailContact = roleActivated === 'coordinateur' ? 'conum-coordinateur@anct.gouv.fr' : 'conseiller-numerique@anct.gouv.fr';

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
        <a className="fr-nav__link" href={urlFormation} target="blank" rel="noreferrer noopener">
          Formation
        </a>
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
              <a className="fr-nav__link" href={`mailto:${mailContact}`}>
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
