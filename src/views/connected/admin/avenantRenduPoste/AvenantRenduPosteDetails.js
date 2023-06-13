import React from 'react';
import dayjs from 'dayjs';
import { badgeStatutDossierDS, pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { conventionActions } from '../../../../actions';

function AvenantRenduPosteDetails({ avenant, idDemandeCoselec }) {
  const dispatch = useDispatch();

  const demandesCoselec = avenant?.demandesCoselec?.find(demande => demande.id === idDemandeCoselec);

  const updateAvenantRenduPoste = () => {
    dispatch(conventionActions.updateAvenantRenduPoste(avenant._id, demandesCoselec.nombreDePostesRendus, avenant.nombreConseillersCoselec));
  };

  return (
    <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title fr-h3">
            Avenant · poste rendu
          </h3>
          <p className="fr-card__desc fr-text--lg fr-text--regular">
            Demande initi&eacute;e&nbsp;
            {demandesCoselec?.emetteurAvenant?.date ?
              <span>le&nbsp;{dayjs(demandesCoselec.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
              <span>&agrave; une date inconnue</span>
            }
          </p>
          <p className="fr-card__desc fr-text--lg" style={{ color: '#000091', width: '54%' }}>
            <strong className="fr-text--bold" style={{ color: '#000091', width: '24%' }}>
              {demandesCoselec?.nombreDePostesRendus}{pluralize(
                ' poste de conseiller vacant rendu ',
                ' poste de conseiller vacant rendu ',
                ' postes de conseillers vacants rendus ',
                demandesCoselec?.nombreDePostesRendus
              )}
            </strong><br />
            s&ucirc;r {avenant?.nombreConseillersCoselec}
            {pluralize(
              ' poste de conseiller validé ',
              ' poste de conseiller validé ',
              ' postes de conseillers validés ',
              avenant?.nombreConseillersCoselec
            )}
            pour ce conventionnement
          </p>
          <p className="fr-card__desc fr-text--lg">
            Motif: {demandesCoselec?.motif ?? 'Non renseigné'}
          </p>
          <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
            {demandesCoselec?.statut === 'validee' ?
              <p className="fr-badge fr-badge--success">Demande valid&eacute;e</p> :
              <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
            }
          </div>
        </div>
        <div className="fr-card__footer">
          <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
            {demandesCoselec?.statut === 'en_cours' &&
              <li>
                <button className="fr-btn" onClick={updateAvenantRenduPoste}>
                  Valider la demande
                </button>
              </li>
            }
            <li className="fr-ml-auto">
              <div className="fr-grid-row" style={{ alignItems: 'baseline' }}>
                {badgeStatutDossierDS(avenant?.dossierReconventionnement?.statut)}
                <a className="fr-btn fr-btn--secondary" href={avenant?.url} target="_blank" rel="noopener noreferrer">
                  Voir le dossier D&eacute;marche Simplifi&eacute;e
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

AvenantRenduPosteDetails.propTypes = {
  avenant: PropTypes.object,
  idDemandeCoselec: PropTypes.string,
};

export default AvenantRenduPosteDetails;
