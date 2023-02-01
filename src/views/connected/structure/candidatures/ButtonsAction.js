import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { conseillerActions } from '../../../../actions/conseillerActions';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import PopinConfirmationAnnulation from '../popins/popinConfirmationAnnulation';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

//Print datePicker calendar in FR
registerLocale('fr', fr);
function ButtonsAction({ statut, updateStatut, miseEnRelationId, dateRecrutement }) {

  const dispatch = useDispatch();

  const [dateValidee, setDateValidee] = useState(dateRecrutement);
  const [openModal, setOpenModal] = useState(false);

  const updateDateRecrutement = date => {
    scrollTopWindow(); //permet de remonter pour visualiser le message date embauche enregistrée
    date = dayjs(date);
    dispatch(conseillerActions.updateDateRecrutement({ id: miseEnRelationId, date }));
  };

  return (
    <div className="">
      <div className="fr-grid-row">
        {statut === 'nouvelle' &&
          <div className="fr-col-5">
            <button onClick={() => updateStatut('interesse')} className="fr-btn fr-icon-success-line fr-btn--icon-left" title="Pré sélectionner">
              Pr&eacute; s&eacute;lectionner
            </button>
          </div>
        }
        {statut === 'nouvelle' &&
          <div className="fr-col-7">
            <button onClick={() => updateStatut('nonInteressee')}
              className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary"
              title="Ce profil ne correspond pas">
              Ce profil ne correspond pas
            </button>
          </div>
        }
        {statut === 'interessee' &&
        <>
          <div className="fr-col-12">
            <label
              className="fr-label"
              style={{ fontSize: 'unset' }}
              htmlFor="datePicker">
              <strong className="important">Indiquer la date de recrutement de ce candidat (obligatoire) :</strong>
            </label>
          </div>

          <div className="fr-col-6 fr-col-xl-12 btn-fr-col-xl-3">
            <DatePicker
              id="datePicker"
              name="datePicker"
              className="fr-input fr-my-2w fr-mr-6w fr-col-6"
              dateFormat="dd/MM/yyyy"
              placeholderText="../../...."
              locale="fr"
              selected={dateValidee ? new Date(dateValidee) : ''}
              onChange={date => setDateValidee(date)}
            />
          </div>

          <div className="fr-col-6 fr-col-xl-6 btn-fr-col-xl-3 fr-my-2w">
            <button onClick={() => {
              updateDateRecrutement(dateValidee);
              updateStatut('recrutee');
            }} disabled={ !dateValidee } className="fr-btn fr-icon-success-line fr-btn--icon-left" title="Valider cette candidature">
              Valider cette candidature
            </button>
          </div>
        </>
        }
        { statut === 'interessee' &&
          <div className="fr-col-6 fr-col-xl-5 btn-fr-col-xl-3 fr-my-2w">
            <button onClick={() => updateStatut('nouvelle')}
              className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary"
              title="Annuler la pré-sélection">
              Annuler la pr&eacute;-s&eacute;lection
            </button>
          </div>
        }
        { statut === 'nonInteressee' &&
          <div className="fr-col-5">
            <button onClick={() => updateStatut('nouvelle')}
              className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary"
              title="Annuler le désintérêt">
              Annuler le d&eacute;sint&eacute;r&ecirc;t
            </button>
          </div>
        }
        {statut === 'recrutee' &&
        <>
          {openModal &&
          <PopinConfirmationAnnulation
            updateStatut={updateStatut}
            updateDateRecrutement={updateDateRecrutement}
            setDateValidee={setDateValidee}
            setOpenModal={setOpenModal}>
          </PopinConfirmationAnnulation>
          }
          <p className="fr-col-6">
            <button id="btn-annuler" onClick={() => {
              setOpenModal(true);
            }}
            className="fr-btn fr-btn--secondary fr-icon-error-line fr-btn--icon-left"
            title="Annuler le recrutement">
            Annuler le recrutement
            </button>
          </p>
        </>
        }
        {statut === 'finalisee' &&
        <>
          <div className="fr-col-12">
            <h3><strong>Recrutement finalis&eacute; pour ce candidat</strong></h3>
          </div>
        </>
        }
      </div>
    </div>
  );
}

ButtonsAction.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func,
  miseEnRelationId: PropTypes.string,
  dateRecrutement: PropTypes.string,
  dateRupture: PropTypes.string,
  motifRupture: PropTypes.string
};

export default ButtonsAction;
