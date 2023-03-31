import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { conseillerActions } from '../../../../actions/conseillerActions';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import PopinConfirmationAnnulation from '../popins/popinConfirmationAnnulation';
import PopinValidationCandidature from '../popins/popinValidationCandidature';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function ButtonsAction({ statut, updateStatut, miseEnRelationId }) {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [openModalValidationCandidature, setOpenModalValidationCandidature] = useState(false);

  const updateDateRecrutement = date => {
    scrollTopWindow(); //permet de remonter pour visualiser le message date embauche enregistrée
    date = dayjs(date);
    dispatch(conseillerActions.updateDateRecrutement({ id: miseEnRelationId, date }));
  };

  return (
    <div className={`${statut === 'interessee' ? 'btn-actions-interessee' : 'btn-actions'} fr-mt-3w fr-mt-md-0w`}>
      {statut === 'nouvelle' &&
      <>
        <button onClick={() => updateStatut('nonInteressee')}
          className="fr-btn fr-btn--secondary"
          title="Ce profil ne correspond pas">
            Ce profil ne correspond pas
        </button>
        <button onClick={() => updateStatut('interessee')} className="fr-btn fr-ml-md-2w fr-mt-2w fr-mt-md-0" title="Pr&eacute;s&eacute;lectionner ce candidat">
          Pr&eacute;s&eacute;lectionner ce candidat
        </button>
      </>
      }
      {statut === 'interessee' &&
      <>
        {openModalValidationCandidature &&
          <PopinValidationCandidature
            updateStatut={updateStatut}
            updateDateRecrutement={updateDateRecrutement}
            setOpenModal={setOpenModalValidationCandidature}
          />
        }
        <button onClick={() => updateStatut('nouvelle')}
          className="fr-btn fr-btn--secondary"
          title="Annuler la pr&eacute;-s&eacute;lection">
        Annuler la pr&eacute;s&eacute;lection
        </button>
        <button onClick={() => {
          setOpenModalValidationCandidature(true);
        }}
        className="fr-btn fr-ml-md-2w fr-mt-2w fr-mt-md-0"
        title="Valider cette candidature">
        Valider cette candidature
        </button>
      </>
      }
      {statut === 'nonInteressee' &&
      <button onClick={() => updateStatut('nouvelle')}
        className="fr-btn fr-btn--secondary"
        title="Annuler le d&eacute;sint&eacute;r&ecirc;t">
        Annuler le d&eacute;sint&eacute;r&ecirc;t
      </button>
      }
      {statut === 'recrutee' &&
        <>
          {openModal &&
          <PopinConfirmationAnnulation
            updateStatut={updateStatut}
            updateDateRecrutement={updateDateRecrutement}
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
        </>
      }
    </div>
  );
}

ButtonsAction.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func,
  miseEnRelationId: PropTypes.string,
  dateRecrutement: PropTypes.string,
};

export default ButtonsAction;
