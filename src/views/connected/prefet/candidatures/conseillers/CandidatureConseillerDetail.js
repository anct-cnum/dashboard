import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../../components/Spinner';
import { scrollTopWindow } from '../../../../../utils/exportsUtils';
import { alerteEtSpinnerActions, structureActions } from '../../../../../actions';
import StructureContactCards from '../../../../../components/cards/StructureContactCards';
import AvenantAjoutPosteDetail from './avenantAjoutPoste/AvenantAjoutPosteDetail';
import StructurePrimoEntranteDetail from './structurePrimoEntrante/StructurePrimoEntranteDetail';

function CandidatureConseillerDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { idStructure } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const statutDemande = queryParams.get('type');
  const idDemandeCoselec = queryParams.get('demande');
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const structure = useSelector(state => state.structure?.structure);
  const listeStructure = useSelector(state => state.structure?.listeStructure);
  const loading = useSelector(state => state.structure?.loading);
  const errorStructure = useSelector(state => state.structure?.error);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const successAvisPrefet = useSelector(state => state.structure?.successAvisPrefet);

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

  const checkIfAvenantCorrect = structure => {
    if (statutDemande === 'avenant-ajout-poste') {
      return structure?.demandesCoselec?.some(demande => demande.id === idDemandeCoselec);
    }
    return true;
  };

  useEffect(() => {
    if (structure !== undefined) {
      if (!checkIfAvenantCorrect(structure)) {
        dispatch(alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: 'L\'avenant n\'a pas pu être chargé !',
          status: null, description: null
        }));
      }
    }
  }, [structure]);

  return (
    <div className="candidatureConseillerDetails">
      <Spinner loading={loading} />
      <Link
        to={location?.state?.origin} state={{ currentPage, statutDemande: location?.state?.statutDemande ?? 'toutes' }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
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
      {statutDemande === 'primo-entrante' &&
        <StructurePrimoEntranteDetail structure={structure} listeStructure={listeStructure} />
      }
      {statutDemande === 'avenant-ajout-poste' && checkIfAvenantCorrect(structure) &&
        <AvenantAjoutPosteDetail structure={structure} idDemandeCoselec={idDemandeCoselec} />
      }
    </div>
  );
}

export default CandidatureConseillerDetail;
