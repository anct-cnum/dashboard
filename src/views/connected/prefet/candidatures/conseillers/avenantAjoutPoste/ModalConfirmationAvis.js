import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../../../actions';
import { useDispatch } from 'react-redux';
import FilterSelect from '../../../../../../components/FilterSelect';

function ModalConfirmationAvis({ setOpenModal, structure, avisPrefet, idDemandeCoselec, listeStructure }) {
  const dispatch = useDispatch();
  const [commentaire, setCommentaire] = useState('');
  const [isTransfert, setIsTransfert] = useState(false);
  const [idStructureTransfert, setIdStructureTransfert] = useState(null);

  const filterOption = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'any',
    stringify: option => option ? `${option?.label}` : undefined,
  };

  const confirmationAvisPrefet = () => {
    dispatch(structureActions.confirmationAvenantAvisPrefet(structure?._id, avisPrefet, commentaire, idDemandeCoselec, idStructureTransfert));
    setOpenModal(false);
    setCommentaire('');
    setIdStructureTransfert(null);
  };

  return (<>
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
                  {!structure?.prefet?.avisPrefet ?
                    <>Confirmer l&rsquo;avis</> : <>Modifier en avis&nbsp;{avisPrefet}</>
                  }
                </h1>
                <p>
                  {!structure?.prefet?.avisPrefet ?
                    <>Souhaitez-vous confirmer l&rsquo;avis&nbsp;{avisPrefet} </> : <>Souhaitez-vous confirmer le changement d&rsquo;avis</>
                  }
                  &nbsp;pour la structure <strong>${structure?.nom}</strong>&nbsp;?
                </p>
                {avisPrefet === 'favorable' &&
                  <fieldset className="fr-fieldset fr-mb-1w" id="checkbox-structure" aria-labelledby="checkbox-structure">
                    <div className="fr-container fr-ml-n6v">
                      <div className="fr-grid-row">
                        <legend className="fr-col-11 fr-fieldset__legend--regular fr-fieldset__legend">
                          Cette demande concerne-t-elle un transfert de poste ?
                        </legend>
                        <div className="fr-col-1 fr-checkbox-group" style={{ width: '10%' }}>
                          <input type="checkbox" id="checkbox-structure-transfert-oui"
                            name="checkbox-structure" aria-describedby="checkbox-structure" onChange={() => setIsTransfert(!isTransfert)} />
                          <label className="fr-label" htmlFor="checkbox-structure-transfert-oui" >
                            Oui
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                }
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
                    }} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      disabled={commentaire.trim().length < 10}
                      onClick={() => {
                        confirmationAvisPrefet();
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

ModalConfirmationAvis.propTypes = {
  setOpenModal: PropTypes.func,
  structure: PropTypes.object,
  avisPrefet: PropTypes.string,
  idDemandeCoselec: PropTypes.string,
  listeStructure: PropTypes.array,
};

export default ModalConfirmationAvis;
