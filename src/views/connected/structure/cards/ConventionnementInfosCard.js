import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { pluralize } from '../../../../utils/formatagesUtils';

const ConventionnementInfosCard = ({ structure }) => {
  return (
    <div className="fr-card fr-mb-4w">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-grid-row fr-grid-row--middle">
            <h4 className="fr-grid-row fr-grid-row--middle">Conventionnement phase 1</h4>
            <p className="fr-badge fr-badge--warning fr-ml-auto">- jours restants avant la fin du premier contrat</p>
          </div>
          <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but :
            {
              structure?.conventionnement?.dossierConventionnement?.dateDeValidation ?
                <span>
              le&nbsp;{dayjs(structure?.conventionnement?.dossierConventionnement?.dateDeValidation).format('DD/MM/YYYY')}
                </span> :
                <span>
                  {' '}date inconnue
                </span>
            }
          </p>
          <div className="fr-card__desc">
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              {structure?.coselec[0]?.nombreConseillersCoselec} - {pluralize(
                'poste de conseiller',
                'poste de conseiller',
                'postes de conseiller',
                structure?.coselec[0]?.nombreConseillersCoselec
              )}
              {' '}
              <span className="fr-text--regular fr-text--md">
                {pluralize(
                  'validé pour ce conventionnement',
                  'validé pour ce conventionnement',
                  'validés pour ce conventionnement',
                  structure?.coselec[0]?.nombreConseillersCoselec
                )}
              </span>
            </p>
            <div className="fr-col-12 fr-mt-1w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              Avenant - - postes de conseiller vacants{' '}
              <span className="fr-text--regular fr-text--md">rendu le -</span>
            </p>
            <div className="fr-col-12 fr-my-1w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <div>
              <ul className="fr-btns-group fr-btns-group--inline-md">
                <li>
                  <p className="fr-text--bold">Profils recrut&eacute;s</p>
                </li>
                <li className="fr-ml-auto">
                  <button className="fr-btn">
                    <i className="ri-folder-2-line fr-mr-1w"></i>Voir le dossier D&eacute;marche
                    Simplifi&eacute;e
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ConventionnementInfosCard.propTypes = {
  onPositionClick: PropTypes.func,
  structure: PropTypes.object
};

export default ConventionnementInfosCard;
