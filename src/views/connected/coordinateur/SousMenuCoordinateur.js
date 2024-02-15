import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { conseillerActions, structureActions } from '../../../actions';

function SousMenuCoordinateur({
  onClickMenu,
  activeMenu,
}) {

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication?.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);

  const { nom, prenom, idPG } = conseiller || {};
  const urlAide = `${process.env.REACT_APP_AIDE_HOSTNAME}/category/tableau-de-pilotage-1i6u8in`;
  const urlCra = `${process.env.REACT_APP_DEMARCHES_SIMPLIFIEES_CRA_COORDINATEUR}?` +
  `identite_nom=${nom}&` +
  `identite_prenom=${prenom}&` +
  `champ_Q2hhbXAtMzU2NjQ5MQ=${nom}&` +
  `champ_Q2hhbXAtMzU2NjUyMA=${prenom}&` +
  `champ_Q2hhbXAtMzU2NjUyMw=${idPG}&` +
  `champ_Q2hhbXAtMzU2NjUyMQ=${structure?.nom}&` +
  `champ_Q2hhbXAtMzU2NjUyMg=${structure?.idPG}`;

  useEffect(() => {
    dispatch(conseillerActions.get(userAuth?.entity?.$id));
  }, []);

  useEffect(() => {
    if (conseiller?.structureId) {
      dispatch(structureActions.get(conseiller?.structureId));
    }
  }
  , [conseiller]);

  return (
    <>
      <a className="fr-nav__link" href={urlCra} target="blank" rel="noreferrer noopener">
          Compte-rendu d&apos;activit&eacute;
      </a>
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

SousMenuCoordinateur.propTypes = {
  onClickMenu: PropTypes.func,
  activeMenu: PropTypes.string,
};

export default SousMenuCoordinateur;
