import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../../components/Spinner';
import { scrollTopWindow } from '../../../../../utils/exportsUtils';
import { alerteEtSpinnerActions, structureActions } from '../../../../../actions';
import dayjs from 'dayjs';
import StructureContactCards from '../../../../../components/cards/StructureContactCards';
import { pluralize } from '../../../../../utils/formatagesUtils';
import ModalConfirmationAvis from './ModalConfirmationAvis';

function CandidatureConseillerDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { idStructure } = useParams();
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const structure = useSelector(state => state.structure?.structure);
  const listeStructure = useSelector(state => state.structure?.listeStructure);
  const loading = useSelector(state => state.structure?.loading);
  const errorStructure = useSelector(state => state.structure?.error);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const successAvisPrefet = useSelector(state => state.structure?.successAvisPrefet);
  const [openModalAvis, setOpenModalAvis] = useState(false);
  const [avisPrefet, setAvisPrefet] = useState('');

  useEffect(() => {
    if (!errorStructure) {
      scrollTopWindow();
      dispatch(structureActions.getDemandeConseiller(idStructure));
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorStructure ?? 'La demande n\'a pas pu être chargée !',
        status: null, description: null
      }));
    }
  }, [errorStructure]);

  useEffect(() => {
    if (successAvisPrefet !== undefined && successAvisPrefet !== false) {
      window.location.href = '/prefet/demandes/conseillers';
    }
  }, [successAvisPrefet]);

  const checkStructureNouvelle = statut => statut === 'CREEE' || statut === 'EXAMEN_COMPLEMENTAIRE_COSELEC';

  return (
    <div className="coordinateurDetails">
      <Spinner loading={loading} />
      <Link
        to={location?.state?.origin} state={{ currentPage, statutDemande: location?.state?.statutDemande ?? 'toutes' }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      {openModalAvis &&
        <ModalConfirmationAvis
          setOpenModal={setOpenModalAvis}
          structure={structure}
          listeStructure={listeStructure}
          avisPrefet={avisPrefet}
        />
      }
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-1w" style={{ color: '#000091' }}>{structure?.nom ?? '-'}</h1>
      </div>
      <div className="fr-col-12 fr-mb-4w">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <span className="fr-text--xl fr-text--bold" style={{ marginBottom: '0' }}>ID - {structure?.idPG ?? ''}</span>
          <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-auto"
            onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}>
            D&eacute;tails structure
          </button>
        </div>
      </div>
      <StructureContactCards structure={structure} />
      <div className="fr-grid-row fr-mt-7w fr-mb-2w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
      </div>
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
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Date de candidature&nbsp;:&nbsp;
              {structure?.createdAt ?
                <span>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</span> :
                <span>Non renseign&eacute;e</span>
              }
            </p>
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
          <div className="fr-card__footer">
            {(!['NÉGATIF', 'POSITIF'].includes(structure?.prefet?.avisPrefet) && checkStructureNouvelle(structure?.statut)) &&
              <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                <li>
                  <button onClick={() => {
                    setAvisPrefet('défavorable');
                    setOpenModalAvis(true);
                  }} className="fr-btn fr-btn--secondary">
                    Avis D&eacute;favorable
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setAvisPrefet('favorable');
                    setOpenModalAvis(true);
                  }} className="fr-btn">
                    Avis Favorable
                  </button>
                </li>
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatureConseillerDetail;
