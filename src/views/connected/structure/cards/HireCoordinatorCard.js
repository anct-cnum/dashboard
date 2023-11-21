import React, { useState } from 'react';
import propTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import PopinSelectionCoordinateur from '../popins/popinSelectionCoordinateur';
import { filterActiveAdvisors } from '../utils/functionUtils';


const HireCoordinatorCard = ({ structure, conseillersActifs, nbPostesCoordoDisponible }) => {

  const filteredActiveAdvisors = conseillersActifs?.filter(contrat => filterActiveAdvisors(contrat, structure)) || [];

  const nbConseillersCoordo = filteredActiveAdvisors?.filter(conseiller => conseiller?.estCoordinateur).length || 0;

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      {openModal && (
        <PopinSelectionCoordinateur
          setOpenModal={setOpenModal}
          conseillersActifs={filteredActiveAdvisors}
          structure={structure}
        />
      )}
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__card" style={{ alignItems: 'center' }}>
            <div className="fr-col-6 card__text">
              <div>
                <span className="fr-text--md fr-text--bold">{`${nbConseillersCoordo}/${nbPostesCoordoDisponible}`}</span>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  {' '}
                  {
                    pluralize('Rôle de coordinateur actif',
                      'Rôle de coordinateur actif',
                      'Rôle de coordinateurs actifs',
                      nbConseillersCoordo)
                  }
                </span>
              </div>
            </div>
            <div className="fr-col-6 card__text" style={{ textAlign: 'end' }}>
              <button disabled={nbPostesCoordoDisponible <= nbConseillersCoordo} className="fr-btn" onClick={() => setOpenModal(true)}>
                  Attribuer un r&ocirc;le de coordinateur
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HireCoordinatorCard.propTypes = {
  conseillersActifs: propTypes.array,
  structure: propTypes.object,
  nbPostesCoordoDisponible: propTypes.number,
};

export default HireCoordinatorCard;
