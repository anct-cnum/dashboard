import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../../../actions';
import { useDispatch } from 'react-redux';
import FilterSelect from '../../../../../../components/FilterSelect';

function ModalConfirmationAvis({ setOpenModal, structure, avisPrefet, listeStructure }) {
  const dispatch = useDispatch();
  const [commentaire, setCommentaire] = useState('');
  const [isTransfert, setIsTransfert] = useState(false);
  const [idStructureTransfert, setIdStructureTransfert] = useState(null);

  const confirmationAvisPrefet = () => {
    dispatch(structureActions.confirmationAvisPrefet(structure?._id, avisPrefet, commentaire, idStructureTransfert));
    setOpenModal(false);
    setCommentaire('');
    setIdStructureTransfert(null);
  };
  const filterOption = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'any',
    stringify: option => option ? `${option?.label}` : undefined,
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
                  <>
                    <fieldset className="fr-fieldset fr-mb-1w" id="radio-hint" aria-labelledby="radio-transfert-structure radio-hint-messages">
                      <legend className="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-transfert-structure">
                        Cette demande concerne-t-elle un transfert de poste&nbsp;?
                      </legend>
                      <div className="fr-fieldset__element">
                        <div className="fr-radio-group" style={{ width: '10%' }}>
                          <input type="radio" id="radio-structure-transfert-oui" name="radio-hint" onChange={() => setIsTransfert(true)} />
                          <label className="fr-label" htmlFor="radio-structure-transfert-oui" >
                            Oui
                          </label>
                        </div>
                      </div>
                      <div className="fr-fieldset__element">
                        <div className="fr-radio-group" style={{ width: '10%' }}>
                          <input type="radio" id="radio-structure-transfert-non" name="radio-hint" onChange={() => setIsTransfert(false)} />
                          <label className="fr-label" htmlFor="radio-structure-transfert-non">
                            Non
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    {isTransfert &&
                      <div className="fr-select-group">
                        <label className="fr-label fr-mb-1w" htmlFor="select">
                          Veuillez s&eacute;lectionner la structure qui transfert son poste
                        </label>
                        <FilterSelect
                          options={listeStructure}
                          onChange={option => option ? setIdStructureTransfert(option?._id) : setIdStructureTransfert(null)}
                          placeholder="Recherchez par id ou nom de la structure"
                          noOptionsMessage={() => 'Aucune structure trouvée'}
                          getOptionLabel={option => `${option?.idPG} - ${option?.nom}`}
                          getOptionValue={option => option?._id}
                          filterOption={filterOption} />
                      </div>
                    }
                  </>
                }
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
                      setOpenModal(false);
                      setCommentaire('');
                      setIdStructureTransfert(null);
                    }} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      disabled={commentaire.trim().length < 10}
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
  editMode: PropTypes.bool
};

export default ModalConfirmationAvis;
