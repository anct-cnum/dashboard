import React, { useState } from 'react';
import dayjs from 'dayjs';
import { badgeStatutDossierDS, pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import ModalValidationAvenantAjoutPoste from '../modals/ModalValidationAvenantAjoutPoste';
import { useDispatch } from 'react-redux';
import { conventionActions } from '../../../../actions';
import { StatutCoselec } from '../../../../utils/enumUtils';

function AvenantAjoutPosteDetails({ avenant, indexDemandesCoselec }) {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const demandesCoselec = avenant?.demandesCoselec?.find(demande => demande.id === indexDemandesCoselec);

  const refusAvenantAjoutPoste = () => {
    dispatch(conventionActions.updateAvenantAjoutPoste(avenant._id, StatutCoselec.NÉGATIF));
  };

  return (
    <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
      {openModal &&
        <ModalValidationAvenantAjoutPoste
          idStructure={avenant._id}
          demandesCoselec={demandesCoselec}
          nombreConseillersCoselec={avenant.nombreConseillersCoselec}
          setOpenModal={setOpenModal}
        />
      }
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title fr-h3">
            Avenant · ajout de poste
          </h3>
          <p className="fr-card__desc fr-text--lg fr-text--regular">
            Demande initi&eacute;e&nbsp;
            {demandesCoselec?.emetteurAvenant?.date ?
              <span>le&nbsp;{dayjs(demandesCoselec.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
              <span>&agrave; une date inconnue</span>
            }
          </p>
          <p className="fr-card__desc fr-text--lg" style={{ color: '#000091', width: '54%' }}>
            <strong className="fr-text--bold">
              {demandesCoselec?.nombreDePostesAccordes ?
                <>
                  Demande de {demandesCoselec?.nombreDePostesAccordes}{pluralize(
                    ' poste de conseiller subventionné supplémentaire ',
                    ' poste de conseiller subventionné supplémentaire ',
                    ' postes de conseillers subventionnés supplémentaires ',
                    demandesCoselec?.nombreDePostesAccordes
                  )}
                </> :
                <>
                  Demande de {demandesCoselec?.nombreDePostesSouhaites}{pluralize(
                    ' poste de conseiller subventionné supplémentaire ',
                    ' poste de conseiller subventionné supplémentaire ',
                    ' postes de conseillers subventionnés supplémentaires ',
                    demandesCoselec?.nombreDePostesSouhaites
                  )}
                </>
              }
            </strong>
            en plus{pluralize(
              ' d\'un ',
              ' d\'un ',
              ' des ',
              avenant?.nombreConseillersCoselec
            )}
            {avenant?.nombreConseillersCoselec}
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
            {demandesCoselec?.statut === 'refusee' &&
              <p className="fr-badge fr-badge--error">Demande refus&eacute;e</p>
            }
            {demandesCoselec?.statut === 'validee' &&
              <p className="fr-badge fr-badge--success">Demande valid&eacute;e</p>
            }
            {demandesCoselec?.statut === 'en_cours' &&
              <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
            }
          </div>
        </div>
        <div className="fr-card__footer">
          <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
            {demandesCoselec?.statut === 'en_cours' &&
              <>
                <li>
                  <button className="fr-btn fr-btn--secondary" onClick={refusAvenantAjoutPoste}>
                    Refuser la demande
                  </button>
                </li>
                <li>
                  <button className="fr-btn" onClick={() => setOpenModal(true)}>
                    Valider la demande
                  </button>
                </li>
              </>
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

AvenantAjoutPosteDetails.propTypes = {
  avenant: PropTypes.object,
  indexDemandesCoselec: PropTypes.string,
};

export default AvenantAjoutPosteDetails;
