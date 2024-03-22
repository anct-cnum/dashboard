import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../../actions';
import { useDispatch } from 'react-redux';

function ModalRefusAvisPrefet({ setOpenModal, structure }) {
  const dispatch = useDispatch();
  const [commentaire, setCommentaire] = useState('');
  const [isTransfert, setIsTransfert] = useState(false);

  const refusAvisPrefet = () => {
    dispatch(structureActions.confirmationAvisPrefet(structure?._id, 'defavorable', commentaire, isTransfert));
    setOpenModal(false);
    setCommentaire('');
  };

  return (<>
    { structure.prefet.avisPrefet !== 'NEGATIF' &&
      <button>
        {structure.prefet.avisPrefet === 'POSITIF' ?
          'Modifier en avis d&eacute;favorable' :
          'Avis d&eacute;favorable'
        }
      </button>
    }

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
                  {structure.prefet.avisPrefet === 'POSITIF' ?
                    'Modifier en avis d&eacute;favorable' :
                    'Confirmer l&rsquo;avis'
                  }
                
        
                </h1>
                <p>
                  {structure.prefet.avisPrefet === 'POSITIF' ?
                    'Souhaitez-vous confirmer le changement d&rsquo;avis' :
                    'Souhaitez-vous confirmer l&rsquo;avis d&eacute;favorable'
                  }
                  &nbsp;pour la structure <strong>${structure?.nom}</strong>&nbsp;?
                </p>
                {structure.prefet.avisPrefet === 'POSITIF' &&
                    <fieldset className="fr-fieldset fr-mb-1w" id="checkbox-structure" aria-labelledby="checkbox-structure">
                      <legend className="fr-fieldset__legend--regular fr-fieldset__legend" id="checkbox-legend-structure">
                        Cette demande concerne-t-elle un transfert de poste ?
                      </legend>
                      <div className="fr-fieldset__element">
                        <div className="fr-checkbox-group" style={{ width: '10%' }}>
                          <input type="checkbox" id="checkbox-structure-transfert-oui"
                            name="checkbox-structure" aria-describedby="checkbox-structure" onChange={() => setIsTransfert(!isTransfert)} />
                          <label className="fr-label" htmlFor="checkbox-structure-transfert-oui" >
                            Oui
                          </label>
                        </div>
                      </div>
                    </fieldset>
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
                      onClick={refusAvisPrefet}
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

ModalRefusAvisPrefet.propTypes = {
  setOpenModal: PropTypes.func,
  structure: PropTypes.object,
};

export default ModalRefusAvisPrefet;
