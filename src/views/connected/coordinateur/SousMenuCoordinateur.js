import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { conseillerActions, structureActions } from '../../../actions';

function SousMenuCoordinateur({
  onClickMenu,
  activeMenu,
}) {

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication?.user);
  const conseiller = useSelector(state => state.conseiller?.connectedConseiller);
  const structure = useSelector(state => state.structure?.connectedStructure);

  const { nom, prenom, idPG } = conseiller || {};
  const urlAide = `${import.meta.env.VITE_APP_AIDE_HOSTNAME}/category/tableau-de-pilotage-1i6u8in`;
  const urlFormation = `${import.meta.env.VITE_APP_PUBLIC_HOSTNAME}/formation`;
  const urlCra = `${import.meta.env.VITE_APP_DEMARCHES_SIMPLIFIEES_CRA_COORDINATEUR}?` +
  `identite_nom=${nom}&` +
  `identite_prenom=${prenom}&` +
  `champ_Q2hhbXAtMzU2NjQ5MQ=${nom}&` +
  `champ_Q2hhbXAtMzU2NjUyMA=${prenom}&` +
  `champ_Q2hhbXAtMzU2NjUyMw=${idPG}&` +
  `champ_Q2hhbXAtMzU2NjUyMQ=${structure?.nom}&` +
  `champ_Q2hhbXAtMzU2NjUyMg=${structure?.idPG}`;

  useEffect(() => {
    dispatch(conseillerActions.getConnectedConseiller(userAuth?.entity?.$id));
  }, []);

  useEffect(() => {
    if (conseiller?.structureId) {
      dispatch(structureActions.getConnectedStructure(conseiller?.structureId));
    }
  }
  , [conseiller]);

  return (
    <>
      <a className="fr-nav__link" href={urlCra} target="blank" rel="noreferrer noopener">
          Compte-rendu d&apos;activit&eacute;
      </a>
      <li className="fr-nav__item">
        <a className="fr-nav__link" href={urlFormation} target="blank" rel="noreferrer noopener">
          Formation
        </a>
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
