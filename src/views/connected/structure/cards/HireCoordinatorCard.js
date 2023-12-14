import React, { useState } from 'react';
import propTypes from 'prop-types';
import { pluralize, validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import PopinSelectionCoordinateur from '../popins/PopinSelectionCoordinateur';
import { calcNbJoursAvantDateFinContrat } from '../../../../utils/calculateUtils';

const HireCoordinatorCard = ({ structure, conseillersActifs, conseillersActifsNonRenouveles, nbPostesCoordoDisponible }) => {
  // conseillers actifs + conseillers actifs non renouvelés traitement pour supprimer les doublons dans les deux listes
  const conseillers = conseillersActifs.concat(conseillersActifsNonRenouveles?.filter(conseillerActifNonRenouvele => {
    return conseillersActifs.every(conseillerActif => conseillerActif?._id !== conseillerActifNonRenouvele?._id);
  }));

  // eslint-disable-next-line max-len
  const checkConseillerDispoCoordo = contrat => calcNbJoursAvantDateFinContrat(contrat?.dateFinDeContrat) > 0 || validTypeDeContratWithoutEndDate(contrat?.typeDeContrat);

  // conseillers actifs + conseillers actifs non renouvelés pour permettre
  // à la structure de choisir un coordinateur parmi les conseillers actifs
  // et les conseillers actifs non renouvelés qui ont une date de fin de contrat non dépassée ou CDI
  const filteredActiveAdvisors = conseillers?.filter(contrat => contrat?.statut === 'finalisee' && checkConseillerDispoCoordo(contrat));
  const nbConseillersCoordo = conseillersActifs?.filter(conseiller => conseiller?.estCoordinateur).length;

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
