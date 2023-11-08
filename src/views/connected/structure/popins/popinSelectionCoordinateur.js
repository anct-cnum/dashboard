import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { structureActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';

function popinSelectionCoordinateur({
  setOpenModal,
  conseillersActifs,
  structure
}) {
  const loadingMisesEnRelation = useSelector(state => state.misesEnRelations?.loading);
  const [selectedConseiller, setSelectedConseiller] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(structureActions.addCoordinateur(structure._id, selectedConseiller));
    setOpenModal(false);
  };

  return (
    <dialog
      aria-labelledby="fr-modal-2-title"
      id="fr-modal-2"
      className="fr-modal modalOpened"
      role="dialog"
    >
      <Spinner loading={loadingMisesEnRelation} />
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  aria-controls="fr-modal-2"
                  onClick={() => setOpenModal(false)}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content fr-mb-2w">
                <h1 id="fr-modal-2-title" className="fr-modal__title" style={{ textAlign: 'center' }}>
                  R&eacute;capitulatif de votre demande
                </h1>
                <div className="fr-select-group" style={{ height: '130px' }}>
                  <label className="fr-label" htmlFor="select" style={{ textAlign: 'center' }}>
                  S&eacute;lectionnez un conseiller &agrave; qui vous souhaitez attribuer attribuer le r&ocirc;le de coordinateur
                  </label>
                  <select className="fr-select" id="select" name="select" onChange={
                    e => {
                      setSelectedConseiller(e.target.value);
                    }
                  }>
                    <option value="" selected disabled hidden>S&eacute;lectionnez un conseiller</option>
                    {conseillersActifs.filter(conseiller => !conseiller.estCoordinateur).map(conseiller => (
                      <option key={conseiller?._id} value={conseiller?._id}>
                        {conseiller?.prenom} {conseiller?.nom} - ID - {conseiller?.idPG}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button className="fr-btn fr-btn--secondary" onClick={() => setOpenModal(false)}>
                     Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      className="fr-btn"
                      onClick={handleSubmit}
                    >
                      D&eacute;finir comme coordinateur
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

popinSelectionCoordinateur.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  conseillersActifs: PropTypes.array.isRequired,
  structure: PropTypes.object.isRequired,
};

export default popinSelectionCoordinateur;
