import React, { useState } from 'react';
import propTypes from 'prop-types';
import { pluralize, validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import PopinSelectionCoordinateur from '../popins/popinSelectionCoordinateur';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import { calcNbJoursAvantDateFinContrat } from '../../../../utils/calculateUtils';

const HireCoordinatorCard = ({ structure, conseillersActifs, conseillersActifsNonRenouveles, nbPostesCoordoDisponible }) => {
  const conseillers = conseillersActifs.concat(conseillersActifsNonRenouveles.filter(conseillerActifNonRenouvele => {
    return conseillersActifs.every(conseillerActif => conseillerActif._id !== conseillerActifNonRenouvele._id);
  }));

  const filteredActiveAdvisors = conseillers?.filter(contrat => {
    const isReconventionnementValide = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
    if (contrat?.statut === 'finalisee' && calcNbJoursAvantDateFinContrat(contrat?.dateFinDeContrat) > 0) {
      if (!isReconventionnementValide) {
        return true;
      }
      return contrat?.phaseConventionnement || validTypeDeContratWithoutEndDate(contrat?.typeDeContrat);
    }
    return false;
  }) || [];
  const nbConseillersCoordo = conseillersActifs?.filter(conseiller => conseiller?.estCoordinateur).length || 0;

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
  conseillersActifsNonRenouveles: propTypes.array,
  structure: propTypes.object,
  nbPostesCoordoDisponible: propTypes.number,
};

export default HireCoordinatorCard;
