import React from 'react';
import propTypes from 'prop-types';
import { calculateMonthsDifference } from '../../../../utils/calculateUtils';
import AdvisorCard from './AdvisorCard';
import { formatTypeDeContrat, validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import { ModalMode } from '../../../../utils/enumUtils';
import { getDemandeInitiee } from '../utils/functionUtils';

const CompleteContractCard = ({ conseiller, handleOpenModalContrat, structure }) => {
  const { dateFinDeContrat, typeDeContrat
  } = conseiller;

  const months = calculateMonthsDifference(dateFinDeContrat, getDemandeInitiee(conseiller)?.dateDeFinSouhaitee);

  return (
    <>
      <AdvisorCard conseiller={conseiller} />
      {/* banniere */}
      <div className="fr-notice fr-py-2w banner warning background">
        <div className="fr-container warning fr-grid-row fr-grid-row--middle">
          <span className="fr-icon-warning-fill icon__color" aria-hidden="true"></span>
          <div className="responsive__banner fr-ml-2w">
            <div className="banner__text">
              <p className="fr-notice__title title__color">
                Envoyer les pi&egrave;ces justificatives sur D&eacute;marches-Simplifi&eacute;es pour
                finaliser la demande de prolongation de contrat
              </p>
              <p className="fr-text--sm">
                {typeDeContrat ?
                  <>
                    Demande d&rsquo;une prolongation {formatTypeDeContrat(typeDeContrat)}
                    &nbsp;{validTypeDeContratWithoutEndDate(typeDeContrat) ? '' : `de ${months} mois supplémentaires`}
                  </> : ''
                }
              </p>
            </div>
          </div>
          <div className="fr-ml-auto fr-grid-row">
            <a
              href={structure?.urlDossierReconventionnementMessagerie}
              target="_blank"
              rel="noopener noreferrer"
              className="fr-btn"
            >
              Compl&eacute;ter le dossier
            </a>
            <button
              className="fr-btn fr-btn--secondary fr-icon-edit-line fr-ml-2w"
              title="&Eacute;diter le contrat"
              onClick={() => handleOpenModalContrat(ModalMode.PROLONGATION, conseiller)}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

CompleteContractCard.propTypes = {
  conseiller: propTypes.object,
  roleActivated: propTypes.string,
  handleOpenModalContrat: propTypes.func,
  structure: propTypes.object,
};

export default CompleteContractCard;
