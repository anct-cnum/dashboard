import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { pluralize, formatNomConseiller } from '../../../../utils/formatagesUtils';
import { calcNbJoursAvantDateFinContrat } from '../../../../utils/calculateUtils';

const ConventionnementInfosCard = ({ structure, roleActivated }) => {
  return (
    <div className="fr-card fr-mb-4w">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-grid-row fr-grid-row--middle">
            <h4 className="fr-grid-row fr-grid-row--middle">Conventionnement phase 1</h4>
            <p className="fr-badge fr-badge--warning fr-ml-auto">
              {
                calcNbJoursAvantDateFinContrat(structure?.dossierReconventionnement?.dateFinProchainContrat) > 0 ?
                  calcNbJoursAvantDateFinContrat(structure?.dossierReconventionnement?.dateFinProchainContrat) : ''
              }
              {pluralize(
                'La date de fin du premier contrat est dépassée',
                ' jour restant avant la fin du premier contrat',
                ' jours restants avant la fin du premier contrat',
                calcNbJoursAvantDateFinContrat(structure?.dossierReconventionnement?.dateFinProchainContrat)
              )}
            </p>
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
              Avenant - postes de conseiller vacants{' '}
              <span className="fr-text--regular fr-text--md">rendu le -</span>
            </p>
            <div className="fr-col-12 fr-my-1w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <div className="fr-grid-row">
              <div>
                <p className="fr-text--bold" style={{ marginBottom: 0 }}>{pluralize(
                  'Profil recruté',
                  'Profil recruté',
                  'Profils recrutés',
                  structure?.conseillersRecruter?.length
                )}
                </p>
                {structure?.conseillersRecruter?.map((conseiller, idx) =>
                  <ul key={idx}style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                      <button
                        style={{ paddingLeft: 0, marginBottom: 0 }}
                        title="D&eacute;tail"
                        className="fr-text"
                        onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}>
                        {conseiller?.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="fr-ml-auto fr-my-auto">
                <button
                  className="fr-btn"
                  title="Voir le dossier D&eacute;marche Simplifi&eacute;e"
                  onClick={
                    () => window.open(
                      structure?.urlDossierConventionnement)
                  }>
                  <i className="ri-folder-2-line fr-mr-1w"></i>
                  Voir le dossier D&eacute;marche Simplifi&eacute;e
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ConventionnementInfosCard.propTypes = {
  structure: PropTypes.object,
  roleActivated: PropTypes.string
};

export default ConventionnementInfosCard;
