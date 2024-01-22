import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { structureActions } from '../../../../../actions';
import { useDispatch } from 'react-redux';

function ModalConfirmationAvis({ setOpenModal, structure, avisPrefet, listeStructure }) {
  const dispatch = useDispatch();
  const [commentaire, setCommentaire] = useState('');
  const [idStructureTransfert, setIdStructureTransfert] = useState(null);

  const confirmationAvisPrefet = () => {
    dispatch(structureActions.confirmationAvisPrefet(structure?._id, avisPrefet, commentaire, idStructureTransfert));
    setOpenModal(false);
    setCommentaire('');
    setIdStructureTransfert(null);
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
                  setIdStructureTransfert(null);
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
                {avisPrefet === 'favorable' &&
                  <div className="fr-select-group">
                    <label className="fr-label fr-mb-1w" htmlFor="select">
                      Cette candidature concerne un transfert de poste
                    </label>
                    <Select options={listeStructure}
                      getOptionLabel={option => option.nom}
                      getOptionValue={option => option._id}
                      onChange={option => setIdStructureTransfert(option._id)}
                      placeholder="Sélectionner une structure"
                      noOptionsMessage={() => 'Aucune structure trouvée'}
                      isClearable
                      styles={{
                        menuList: baseStyles => ({
                          ...baseStyles,
                          maxHeight: '14.2rem',
                        }),
                        control: baseStyles => ({
                          ...baseStyles,
                          borderRadius: '0.25rem 0.25rem 0 0',
                          borderWidth: '0',
                          backgroundColor: 'var(--background-contrast-grey)',
                          fontFamily: 'Marianne, arial, sans-serif',
                          boxShadow: 'inset 0 -2px 0 0 var(--border-plain-grey)',
                          paddingTop: '0.2rem',
                          paddingBottom: '0.2rem',
                        }),
                        option: (base, state) => ({
                          ...base,
                          height: '100%',
                          cursor: 'pointer',
                          backgroundColor: state.isFocused ? 'var(--background-action-high-blue-france)' : '',
                          color: state.isFocused ? 'var(--text-inverted-blue-france)' : 'var(--text-label-grey)',
                        }),
                      }}
                    />
                  </div>
                }
                <div className="fr-input-group">
                  <label className="fr-label" htmlFor="commentaire-input">
                    Commentaire (obligatoire, max 1000 caract&egrave;res)&nbsp;:
                  </label>
                  <textarea
                    value={commentaire}
                    id="commentaire-input"
                    maxLength={1000}
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
                      setIdStructureTransfert(null);
                    }} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      disabled={commentaire.length === 0}
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
  listeStructure: PropTypes.array,
};

export default ModalConfirmationAvis;
