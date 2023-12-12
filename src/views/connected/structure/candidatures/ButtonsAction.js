import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import PopinConfirmationAnnulation from '../popins/PopinConfirmationAnnulation';
import PopinEditionContrat from '../popins/PopinEditionContrat';
import { contratActions } from '../../../../actions';

function ButtonsAction({ updateStatut, miseEnRelation, setDisplayModal }) {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openModalContrat, setOpenModalContrat] = useState(false);

  const updateContractRecrutement = (typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur = false) => {
    dispatch(contratActions.updateContractRecrutementStructure(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, miseEnRelation._id));
    // eslint-disable-next-line max-len
    if ((miseEnRelation?.contratCoordinateur && miseEnRelation?.contratCoordinateur !== isRecrutementCoordinateur) || (!miseEnRelation?.contratCoordinateur && isRecrutementCoordinateur)) {
      setDisplayModal(true);
    }
  };

  return (
    <>
      {openModalContrat &&
        <PopinEditionContrat
          setOpenModalContrat={setOpenModalContrat}
          updateContract={updateContractRecrutement}
          conseiller={miseEnRelation}
          editMode={editMode}
          createContract={updateContractRecrutement}
        />
      }
      <div className={`${miseEnRelation?.statut === 'interessee' || miseEnRelation?.statut === 'nouvelle' ? 'btn-actions-interessee' : 'btn-actions'}`}>
        {miseEnRelation?.statut === 'nouvelle' &&
          <>
            <button onClick={() => updateStatut('nonInteressee')}
              className="fr-btn fr-btn--secondary fr-mt-2w fr-mt-md-0"
              title="Ce profil ne correspond pas">
              Ce profil ne correspond pas
            </button>
            <button
              onClick={() => updateStatut('interessee')}
              className="fr-btn fr-ml-md-2w fr-mt-2w fr-mt-md-0"
              title="Pr&eacute;s&eacute;lectionner ce candidat">
              Pr&eacute;s&eacute;lectionner ce candidat
            </button>
          </>
        }
        {miseEnRelation?.statut === 'interessee' &&
          <>
            <button onClick={() => updateStatut('nouvelle')}
              className="fr-btn fr-btn--secondary"
              title="Annuler la pr&eacute;-s&eacute;lection">
              Annuler la pr&eacute;s&eacute;lection
            </button>
            <button onClick={() => {
              setOpenModalContrat(true);
            }}
            className="fr-btn fr-ml-md-2w fr-mt-2w fr-mt-md-0"
            title="Valider cette candidature">
              Valider cette candidature
            </button>
          </>
        }
        {miseEnRelation?.statut === 'nonInteressee' &&
          <button onClick={() => updateStatut('nouvelle')}
            className="fr-btn fr-btn--secondary"
            title="Annuler le d&eacute;sint&eacute;r&ecirc;t">
            Annuler le d&eacute;sint&eacute;r&ecirc;t
          </button>
        }
        {miseEnRelation?.statut === 'recrutee' &&
          <>
            {openModal &&
              <PopinConfirmationAnnulation
                updateStatut={updateStatut}
                setOpenModal={setOpenModal}
              />
            }
            <button id="btn-annuler" onClick={() => {
              setOpenModal(true);
            }}
            className="fr-btn fr-btn--secondary"
            title="Annuler le recrutement">
              Annuler le recrutement
            </button>
            <button onClick={() => {
              setEditMode(true);
              setOpenModalContrat(true);
            }}
            className="fr-btn fr-ml-md-2w fr-mt-2w fr-mt-md-0"
            title="Modifier le contrat">
              Modifier le contrat
            </button>
          </>
        }
      </div>
    </>
  );
}

ButtonsAction.propTypes = {
  updateStatut: PropTypes.func,
  miseEnRelation: PropTypes.object,
  setDisplayModal: PropTypes.func,
};

export default ButtonsAction;
