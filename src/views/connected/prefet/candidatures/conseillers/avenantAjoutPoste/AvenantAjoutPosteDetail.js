import React, { useState } from 'react';
import dayjs from 'dayjs';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import ModalConfirmationAvis from './ModalConfirmationAvis';
import ModalModifierCommentaire from './ModalModifierCommentaire';

function AvenantAjoutPosteDetail({ structure, idDemandeCoselec, listeStructure }) {
  const [openModalAvis, setOpenModalAvis] = useState(false);
  const [openModalCommentaire, setOpenModalCommentaire] = useState(false);
  const [avisPrefet, setAvisPrefet] = useState('');
  const demandesCoselec = structure?.demandesCoselec?.find(demande => demande.id === idDemandeCoselec);

  return (
    <div className="fr-card fr-mt-8w">
      {openModalAvis &&
        <ModalConfirmationAvis
          setOpenModal={setOpenModalAvis}
          structure={structure}
          listeStructure={listeStructure}
          avisPrefet={avisPrefet}
          demandesCoselec={demandesCoselec}
        />
      }
      {openModalCommentaire &&
        <ModalModifierCommentaire
          setOpenModalCommentaire={setOpenModalCommentaire}
          demandesCoselec={demandesCoselec}
          structure={structure}
        />
      }
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-card__header">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
            }}>
              <h3 className="fr-card__title fr-h3">
                Demande de&nbsp;{pluralize(
                  'poste supplémentaire',
                  'poste supplémentaire',
                  'postes supplémentaires',
                  demandesCoselec?.nombreDePostesSouhaites,
                  true
                )}
              </h3>
              {demandesCoselec?.prefet?.avis &&
                <p className={`fr-badge fr-badge--${demandesCoselec?.prefet?.avis === 'favorable' ? 'success' : 'error'}`}>
                  Avis {demandesCoselec?.prefet?.avis}
                </p>
              }
              {!demandesCoselec?.prefet?.avis &&
                <p className="fr-badge fr-badge--new">En attente d&rsquo;avis</p>
              }
            </div>
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Demande initi&eacute;e&nbsp;
              {demandesCoselec?.emetteurAvenant?.date ?
                <span>le&nbsp;{dayjs(demandesCoselec.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
                <span>&agrave; une date inconnue</span>
              }
            </p>
            {structure?.structureTransfert &&
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Cette candidature est une demande de transfert de poste depuis la structure&nbsp;
              <strong>{structure.structureTransfert.idPG} - {structure.structureTransfert.nom}</strong>
            </p>
            }
            <p className="fr-card__desc fr-text--lg" style={{ color: '#000091' }}>
              <strong className="fr-text--bold">
                {pluralize(
                  'poste attribué à cette structure',
                  'poste attribué à cette structure',
                  'postes attribués à cette structure',
                  structure?.nombreConseillersCoselec,
                  true
                )}
              </strong>
            </p>
          </div>
          <hr className="fr-card__desc" style={{ marginLeft: '-2rem', marginRight: '-2rem' }} />
          <div className="fr-card__desc fr-text--md" style={{ display: 'flex', marginTop: '3.7rem', gap: '24px' }}>
            <div className="motif-structure">
              <strong>Motif de la structure:</strong>
              <span className="fr-mt-1w">{demandesCoselec?.motif ?? 'Non renseigné'}</span>
            </div>
            {demandesCoselec?.prefet?.commentaire &&
              <div className={`commentaire-prefet ${demandesCoselec?.prefet?.avis === 'favorable' ? 'positif' : 'negatif'}`}>
                <strong>Commentaire pr&eacute;fet:</strong>
                <span className="fr-mt-1w">{demandesCoselec.prefet.commentaire}</span>
                {demandesCoselec?.statut === 'en_cours' &&
                  <button className={`lien-modifier ${demandesCoselec?.prefet?.avis === 'favorable' ? 'positif' : 'negatif'}`}
                    onClick={() => {
                      setOpenModalCommentaire(true);
                    }}>
                    Modifier mon commentaire <i className="ri-edit-line ri-xl"></i>
                  </button>
                }
              </div>
            }
          </div>
        </div>
        {demandesCoselec?.statut === 'en_cours' &&
          <div className="fr-card__footer" style={{ paddingTop: '0' }}>
            <hr style={{ borderWidth: '0.5px' }} />
            <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--center fr-btns-group--inline-lg">
              {!demandesCoselec?.prefet?.avis ?
                <>
                  <li>
                    <button onClick={() => {
                      setAvisPrefet('défavorable');
                      setOpenModalAvis(true);
                    }} className="fr-btn fr-btn--secondary">
                      Avis d&eacute;favorable
                    </button>
                  </li>
                  <li>
                    <button onClick={() => {
                      setAvisPrefet('favorable');
                      setOpenModalAvis(true);
                    }} className="fr-btn">
                      Avis favorable
                    </button>
                  </li>
                </> :
                <button className="fr-btn" onClick={() => {
                  setAvisPrefet(demandesCoselec?.prefet?.avis === 'favorable' ? 'défavorable' : 'favorable');
                  setOpenModalAvis(true);
                }}>
                  Modifier en avis {demandesCoselec?.prefet?.avis === 'favorable' ? <>d&eacute;favorable</> : 'favorable'}
                </button>
              }
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

AvenantAjoutPosteDetail.propTypes = {
  structure: PropTypes.object,
  idDemandeCoselec: PropTypes.string,
  listeStructure: PropTypes.array,
};

export default AvenantAjoutPosteDetail;
