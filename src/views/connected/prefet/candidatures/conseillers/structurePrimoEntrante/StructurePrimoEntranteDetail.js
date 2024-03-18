import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import ModalConfirmationAvis from './ModalConfirmationAvis';
import PropTypes from 'prop-types';

function StructurePrimoEntranteDetail({ structure, listeStructure }) {
  const successAvisPrefet = useSelector(state => state.structure?.successAvisPrefet);
  const [openModalAvis, setOpenModalAvis] = useState(false);
  const [avisPrefet, setAvisPrefet] = useState('');

  useEffect(() => {
    if (successAvisPrefet !== undefined && successAvisPrefet !== false) {
      window.location.href = '/prefet/demandes/conseillers';
    }
  }, [successAvisPrefet]);

  const checkStructureNouvelle = statut => statut === 'CREEE' || statut === 'EXAMEN_COMPLEMENTAIRE_COSELEC';

  const avisPrefetPourModification = avisPrefet => avisPrefet === 'POSITIF' ? 'défavorable' : 'favorable';

  return (
    <div className="fr-card fr-mt-8w">
      {openModalAvis &&
        <ModalConfirmationAvis
          setOpenModal={setOpenModalAvis}
          structure={structure}
          listeStructure={listeStructure}
          avisPrefet={avisPrefet}
        />
      }
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-card__header">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse'
            }}>
              {structure?.nombreConseillersSouhaites ?
                <h3 className="fr-card__title fr-h3">
                  Demande de&nbsp;{pluralize(
                    'poste supplémentaire',
                    'poste supplémentaire',
                    'postes supplémentaires',
                    structure.nombreConseillersSouhaites,
                    true
                  )}
                </h3> :
                <h3 className="fr-card__title fr-h3">
                  <strong className="fr-text--bold">
                    Nombre de poste de conseiller demand&eacute; non renseign&eacute;
                  </strong>
                </h3>
              }
              {structure?.prefet?.avisPrefet === 'NÉGATIF' &&
                <p className="fr-badge fr-badge--error">Avis d&eacute;favorable</p>
              }
              {structure?.prefet?.avisPrefet === 'POSITIF' &&
                <p className="fr-badge fr-badge--success">Avis favorable</p>
              }
              {!['NÉGATIF', 'POSITIF'].includes(structure?.prefet?.avisPrefet) &&
                <p className="fr-badge fr-badge--new">En attente d&rsquo;avis</p>
              }
            </div>
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Demande initi&eacute;e le&nbsp;
              {structure?.createdAt ?
                <span>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</span> :
                <span>Non renseign&eacute;e</span>
              }
            </p>
          </div>
          <div className="fr-col-12" style={{ position: 'absolute', left: '0', top: '135px' }} >
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
          <div className="fr-card__desc fr-text--md" style={{ display: 'flex', marginTop: '3.7rem', gap: '24px' }}>
            <div className="motif-structure">
              <strong>Motif de la structure:</strong>
              <span className="fr-mt-1w">Nouveau poste</span>
            </div>
            {['NÉGATIF', 'POSITIF'].includes(structure?.prefet?.avisPrefet) &&
              <div className="commentaire-prefet">
                <strong>Commentaire pr&eacute;fet:</strong>
                <span className="fr-mt-1w">{structure?.prefet?.commentairePrefet ?? 'Non renseignée'}</span>
              </div>
            }
          </div>
        </div>
        {checkStructureNouvelle(structure?.statut) &&
          <div className="fr-card__footer" style={{ paddingTop: '0' }}>
            <hr style={{ borderWidth: '0.5px' }} />
            <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg fr-btns-group--center">
              {!['NÉGATIF', 'POSITIF'].includes(structure?.prefet?.avisPrefet) &&
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
                </>
              }
              {['NÉGATIF', 'POSITIF'].includes(structure?.prefet?.avisPrefet) &&
                <li>
                  <button onClick={() => {
                    setAvisPrefet(avisPrefetPourModification(structure?.prefet?.avisPrefet));
                    setOpenModalAvis(true);
                  }} className="fr-btn">
                    Modifier en avis {avisPrefetPourModification(structure?.prefet?.avisPrefet)}
                  </button>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

StructurePrimoEntranteDetail.propTypes = {
  structure: PropTypes.object,
  listeStructure: PropTypes.array,
};

export default StructurePrimoEntranteDetail;
