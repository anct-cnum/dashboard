import React from 'react';
import propTypes from 'prop-types';
import dayjs from 'dayjs';
import { calculateMonthsDifference } from '../../../../utils/calculateUtils';
import AdvisorCard from './AdvisorCard';
import { formatTypeDeContrat } from '../../../../utils/formatagesUtils';

const CompleteContractCard = ({ conseiller, roleActivated, handleOpenModalContrat, structure }) => {
  const { dateDebutDeContrat, dateFinDeContrat, typeDeContrat } = conseiller;

  const months = calculateMonthsDifference(dateDebutDeContrat, dateFinDeContrat);

  const handleEditContract = conseiller => {
    handleOpenModalContrat(true, conseiller);
  };

  return (
    <>
      <AdvisorCard conseiller={conseiller} roleActivated={roleActivated} />
      {/* banniere */}
      <div className="fr-notice fr-py-2w banner warning background">
        <div className="fr-container warning fr-grid-row fr-grid-row--middle">
          <span className="fr-icon-warning-fill icon__color" aria-hidden="true"></span>
          <div className="responsive__banner fr-ml-2w">
            <div className="banner__text">
              <p className="fr-notice__title title__color">Envoyer les pi&egrave;ces justificatives pour finaliser la demande de renouvellement</p>
              <p className="fr-text--sm">
                {
                  `Demande d'un contrat ${formatTypeDeContrat(typeDeContrat)} ${typeDeContrat === 'CDI' ? '' : `de ${months} mois`} avec une date de début le
                  ${dayjs(dateDebutDeContrat).format('DD/MM/YYYY')}.`
                }
              </p>
            </div>
          </div>
          <div className="fr-ml-auto fr-grid-row">
            <button
              title="Compl&eacute;ter le dossier"
              className="fr-btn"
              onClick={() => window.open(structure?.urlDossierReconventionnementMessagerie)}
            >
              Compl&eacute;ter le dossier
            </button>
            <button
              className="fr-btn fr-btn--secondary fr-icon-edit-line fr-ml-2w"
              title="&Eacute;diter le contrat"
              onClick={() => handleEditContract(conseiller)}
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
