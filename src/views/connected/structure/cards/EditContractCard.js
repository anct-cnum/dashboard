import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import AdvisorCard from './AdvisorCard';

const EditContractCard = ({ conseiller, setOpenModalContrat, setMiseEnrelationId }) => {

  useEffect(() => {
    if (conseiller?.miseEnrelationId) {
      setMiseEnrelationId(conseiller?.miseEnrelationId);
    }
  }, [conseiller.miseEnrelationId]);

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
              onClick={() => setOpenModalContrat(true)}
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
  setOpenModalContrat: propTypes.func,
  setMiseEnrelationId: propTypes.func,
};

export default EditContractCard;
