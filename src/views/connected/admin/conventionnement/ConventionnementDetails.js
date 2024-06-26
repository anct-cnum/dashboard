import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import ModalValidationAttributionPoste from '../modals/ModalValidationAttributionPoste';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { structureActions } from '../../../../actions';
import ModalRefusAttributionPoste from '../modals/ModalRefusAttributionPoste';
import { statutStructure } from '../../../../utils/enumUtils';

function ConventionnementDetails({ structure }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successAvisAdmin = useSelector(state => state.structure?.successAvisAdmin);

  const [openModalValidationAttributionPoste, setOpenModalValidationAttributionPoste] = useState(false);
  const [openModalRefusAttributionPoste, setOpenModalRefusAttributionPoste] = useState(false);

  useEffect(() => {
    if (successAvisAdmin) {
      navigate('/admin/demandes/conventions',
        {
          state: {
            typeConvention: 'conventionnement',
            structure: {
              nom: structure?.nom,
              statutDemande: structure?.statut === statutStructure.VALIDATION_COSELEC ? 'POSITIF' : 'NÉGATIF',
              nombreDePostesAccordes: structure?.coselec[0]?.nombreConseillersCoselec,
            },
          }
        },
        {
          replace: true
        }
      );
      dispatch(structureActions.resetConfirmationAvisAdmin());
    }
  }, [successAvisAdmin]);

  return (
    <>
      {openModalValidationAttributionPoste &&
        <ModalValidationAttributionPoste
          setOpenModal={setOpenModalValidationAttributionPoste}
          structure={structure}
        />
      }
      {openModalRefusAttributionPoste &&
        <ModalRefusAttributionPoste setOpenModal={setOpenModalRefusAttributionPoste} structure={structure} />
      }
      <h2>Candidature</h2>
      <div className="fr-card">
        <div className="fr-card__body">
          <div className="fr-card__header fr-mt-4w">
            <h3 className="fr-card__title fr-h3">
              {pluralize(
                'Demande de conseiller',
                'Demande de conseiller',
                'Demande de conseillers',
                structure?.nombreConseillersSouhaites
              )}
            </h3>
            {structure?.prefet?.avisPrefet === 'POSITIF' &&
              <p className="fr-badge fr-badge--success badge-avis-prefet">Avis pr&eacute;fet favorable</p>
            }
            {structure?.prefet?.avisPrefet === 'NÉGATIF' &&
              <p className="fr-badge fr-badge--error badge-avis-prefet">Avis pr&eacute;fet d&eacute;favorable</p>
            }
            {!['POSITIF', 'NÉGATIF'].includes(structure?.prefet?.avisPrefet) &&
              <p className="fr-badge fr-badge--new badge-avis-prefet">Avis pr&eacute;fet non renseign&eacute;</p>
            }
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Date de candidature&nbsp;:&nbsp;
              {structure?.createdAt ?
                <span>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</span> :
                <span>Non renseign&eacute;e</span>
              }
            </p>
            {structure?.prefet?.structureTransfert &&
              <p className="fr-card__desc fr-text--lg fr-text--regular">
                Cette candidature est une demande de transfert de poste depuis la structure&nbsp;
                <strong>{structure.prefet.structureTransfert.idPG} - {structure.prefet.structureTransfert.nom}</strong>
              </p>
            }
            {structure?.nombreConseillersSouhaites ?
              <p className="fr-card__desc fr-text--lg" style={{ color: '#000091' }}>
                <strong className="fr-text--bold">
                  {structure.nombreConseillersSouhaites}{pluralize(
                    ' poste de conseiller demandé ',
                    ' poste de conseiller demandé ',
                    ' postes de conseillers demandés ',
                    structure.nombreConseillersSouhaites
                  )}
                </strong>
                pour ce conventionnement
              </p> :
              <p className="fr-card__desc fr-text--lg" style={{ color: '#000091' }}>
                <strong className="fr-text--bold">
                  Nombre de poste de conseiller demand&eacute; non renseign&eacute; pour ce conventionnement
                </strong>
              </p>
            }
          </div>
          <div className="fr-card__content">
            <div className="commentaire-prefet">
              <span><strong>Commentaire pr&eacute;fet&nbsp;:&nbsp;</strong></span>
              {structure?.prefet?.commentairePrefet ?
                <p className="fr-mt-2w fr-mb-0">{structure.prefet.commentairePrefet}</p> :
                <p className="fr-mt-2w fr-mb-0">Non renseign&eacute;</p>
              }
            </div>
          </div>
          {(structure?.statut === 'CREEE' || structure?.statut === 'EXAMEN_COMPLEMENTAIRE_COSELEC') &&
            <div className="fr-card__footer">
              <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                <li>
                  <button className="fr-btn fr-btn--secondary" onClick={() => setOpenModalRefusAttributionPoste(true)}>
                    Refuser la candidature
                  </button>
                </li>
                <li>
                  <button className="fr-btn" onClick={() => setOpenModalValidationAttributionPoste(true)}>
                    Valider la candidature
                  </button>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    </>
  );
}

ConventionnementDetails.propTypes = {
  structure: PropTypes.object,
};

export default ConventionnementDetails;
