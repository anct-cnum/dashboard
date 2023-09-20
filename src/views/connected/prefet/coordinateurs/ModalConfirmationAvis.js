import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { coordinateurActions } from '../../../../actions';

function ModalConfirmationAvis({ setOpenModal, structure, avisPrefet }) {
  const dispatch = useDispatch();
  const [commentaire, setCommentaire] = useState('');

  const confirmationAvisPrefet = () => {
    dispatch(coordinateurActions.confirmationAvisPrefet(structure?._id, avisPrefet, structure?.demandesCoordinateur[0]?.id, commentaire));
    setOpenModal(false);
    setCommentaire('');
  };
  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" title="Fermer la fen&ecirc;tre modale" aria-controls="fr-modal-2" onClick={() => {
                  setOpenModal(false);
                  setCommentaire('');
                }}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                  Confirmer l&rsquo;avis
                </h1>
                <p>Souhaitez-vous confirmer l&rsquo;avis {avisPrefet} pour la structure <strong>{structure?.nom}</strong>&nbsp;?</p>
                <div className="fr-input-group">
                  <label className="fr-label" htmlFor="commentaire-input">
                    Commentaire (max 250 caract&egrave;res)&nbsp;:
                  </label>
                  <textarea
                    value={commentaire}
                    id="commentaire-input"
                    maxLength={250}
                    onChange={e => setCommentaire(e?.target?.value)}
                    style={{ height: '6rem' }}
                    className="fr-input"
                    type="text"
                    placeholder="Commentaire"
                  />
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => {
                      setOpenModal(false);
                      setCommentaire('');
                    }} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={confirmationAvisPrefet}
                      className="fr-btn"
                    >
                      Confirmer
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

ModalConfirmationAvis.propTypes = {
  setOpenModal: PropTypes.func,
  structure: PropTypes.object,
  avisPrefet: PropTypes.string,
};

export default ModalConfirmationAvis;
