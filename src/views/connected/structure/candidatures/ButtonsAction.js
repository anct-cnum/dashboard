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
    <div className="fr-ml-auto">
      {statut === 'nouvelle' &&
      <>
        <button onClick={() => updateStatut('interessee')} className="fr-btn fr-icon-success-line fr-btn--icon-left" title="Pré sélectionner">
          Pr&eacute; s&eacute;lectionner
        </button>
        <button onClick={() => updateStatut('nonInteressee')}
          className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary fr-ml-2w"
          title="Ce profil ne correspond pas">
            Ce profil ne correspond pas
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
          >
          </PopinValidationCandidature>
        }
        <button onClick={() => {
          setOpenModalValidationCandidature(true);
        }}
        className="fr-btn fr-icon-success-line fr-btn--icon-left"
        title="Valider cette candidature">
        Valider cette candidature
        </button>
        <button onClick={() => updateStatut('nouvelle')}
          className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary fr-ml-2w"
          title="Annuler la pré-sélection">
        Annuler la pr&eacute;-s&eacute;lection
        </button>
      </>
      }
      {statut === 'nonInteressee' &&
      <button onClick={() => updateStatut('nouvelle')}
        className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary"
        title="Annuler le désintérêt">
        Annuler le d&eacute;sint&eacute;r&ecirc;t
      </button>
      }
      {statut === 'recrutee' &&
        <>
          {openModal &&
          <PopinConfirmationAnnulation
            updateStatut={updateStatut}
            updateDateRecrutement={updateDateRecrutement}
            setOpenModal={setOpenModal}>
          </PopinConfirmationAnnulation>
          }
          <button id="btn-annuler" onClick={() => {
            setOpenModal(true);
          }}
          className="fr-btn fr-btn--secondary fr-icon-error-line fr-btn--icon-left"
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
