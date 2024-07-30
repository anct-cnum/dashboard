import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import AdvisorCard from './AdvisorCard';

const EditContractCard = ({ conseiller, handleOpenModalContrat }) => {

  return (
    <>
      <AdvisorCard conseiller={conseiller} />
      {/* banniere */}
      <div className="fr-col-12 fr-py-2w card-banner-bottom-edit">
        <div className="fr-container notice responsive__banner__edit">
          <div className="fr-col-8 text">
            <div>
              <span className="fr-icon-info-fill icon__color" aria-hidden="true"></span>
              <span className="fr-text--md fr-text--bold fr-ml-2w title__color">
                {conseiller ? `Nouveau contrat de ${formatNomConseiller(conseiller)} en attente de renouvellement` : ''}
              </span>
            </div>
          </div>
          <div className="fr-ml-auto">
            <button
              className="fr-btn fr-btn--icon-left fr-icon-edit-line card__button"
              title="&Eacute;diter son nouveau contrat"
              onClick={() => handleOpenModalContrat(false, conseiller)}
            >
              &Eacute;diter son nouveau contrat
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

EditContractCard.propTypes = {
  conseiller: propTypes.object,
  roleActivated: propTypes.string,
  handleOpenModalContrat: propTypes.func,
};

export default EditContractCard;
