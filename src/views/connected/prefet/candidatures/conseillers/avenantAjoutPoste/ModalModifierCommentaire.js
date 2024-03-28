import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../../../actions';
import { useDispatch } from 'react-redux';

function ModalModifierCommentaire({ setOpenModalCommentaire, avisPrefet, structure, idDemandeCoselec }) {
  const dispatch = useDispatch();
  const [commentaire, setCommentaire] = useState('');

  const modificationCommentaireAvisPrefet = () => {
    dispatch(structureActions.modificationCommentaireAvisPrefet(structure?._id, avisPrefet, commentaire, idDemandeCoselec));
    setOpenModalCommentaire(false);
    setCommentaire('');
  };

  return (<>
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" title="Fermer la fen&ecirc;tre modale" aria-controls="fr-modal-2" onClick={() => {
                  setOpenModalCommentaire(false);
                  setCommentaire('');
                }}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                  Modifier mon commentaire
                </h1>
                <div className="fr-input-group">
                  <label className="fr-label" htmlFor="commentaire-input">
                    Commentaire (obligatoire, max 1000 caract&egrave;res)&nbsp;:
                  </label>
                  <textarea
                    value={commentaire}
                    id="commentaire-input"
                    maxLength={1000}
                    minLength={10}
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
                      setOpenModalCommentaire(false);
                      setCommentaire('');
                    }} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      disabled={commentaire.trim().length < 10}
                      onClick={() => {
                        modificationCommentaireAvisPrefet();
                      }}
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
  </>
  );
}

ModalModifierCommentaire.propTypes = {
  setOpenModalCommentaire: PropTypes.func,
  avisPrefet: PropTypes.string,
  structure: PropTypes.object,
  idDemandeCoselec: PropTypes.string,
};

export default ModalModifierCommentaire;
